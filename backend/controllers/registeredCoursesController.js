const RegisteredCourses = require('../models/registeredCoursesModel');
const Course = require('../models/courseModel');
const { getSolution } = require('./userSolutionController');
const { getExam } = require('./examController');
const { createNote, updateNote, deleteNote } = require('./noteController');

const { sendCertificateEmail } = require('../controllers/userController');
const asyncHandler = require('express-async-handler');
const schedule = require('node-schedule');

const getAllRegisteredCourses = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const reg = await RegisteredCourses.find({ userId: userId }).populate('courseId');
  const results = reg.map((course, index) => {
    return course.courseId;
  });
  var returnResult;
  if (reg) {
    returnResult = await Promise.all(
      results.map(async (result, index) => {
        result = await result.populate('instructor', 'firstName lastName');
        result = await result.populate('subject');
        if (result.subtitles.length) {
          result = await result.populate('subtitles');
          var newSubtitles = await Promise.all(
            result.subtitles.map(async (subtitle, index) => {
              if (subtitle.quizzes.length) {
                var newQuizzes = await Promise.all(
                  subtitle.quizzes.map(async (quiz, index) => {
                    const s = await getSolution(res.locals.userId, quiz).catch((err) => {
                      throw err;
                    });
                    const ex = await getExam(quiz, false).catch((err) => {
                      throw err;
                    });
                    if (s) {
                      return {
                        _id: ex._id,
                        title: ex.title,
                        solved: true,
                        grade: s.grade
                      };
                    } else {
                      return {
                        _id: ex._id,
                        title: ex.title,
                        solved: false
                      };
                    }
                  })
                );
                return {
                  ...subtitle.toObject(),
                  quizzes: newQuizzes
                };
              } else {
                return {
                  title: subtitle.title,
                  hours: subtitle.hours,
                  videos: subtitle.videos,
                  quizzes: []
                };
              }
            })
          );
          result = { ...result.toObject(), subtitles: newSubtitles };
        }
        if (result.exams.length) {
          const exams = await Promise.all(
            result.exams.map(async (exam, index) => {
              const s = await getSolution(res.locals.userId, exam).catch((err) => {
                throw err;
              });
              const ex = await getExam(exam, false).catch((err) => {
                throw err;
              });
              if (s) {
                return {
                  _id: ex._id,
                  title: ex.title,
                  solved: true,
                  grade: s.grade
                };
              } else {
                return {
                  _id: ex._id,
                  title: ex.title,
                  solved: false
                };
              }
            })
          );
          result = { ...result, exams: exams };
          return result;
        }
      })
    );
  } else {
    returnResult = [];
  }
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Courses fetched successfully',
    payload: { courses: returnResult }
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { courseId } = req.query;
  await RegisteredCourses.create({
    userId: userId,
    courseId: courseId
  }).then((result) => {
    var rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, 1);
    schedule.scheduleJob(result._id + 'email', rule, async function () {
      try {
        console.log(
          `Background function run to check progress of user ${userId} in course ${courseId} to determine if a certificate of completion should be sent to his/her email.`
        );
        const reg = await RegisteredCourses.findById(result._id);
        if (reg.progress === 100) {
          const regCourse = await Course.findById(courseId);
          const results = await Promise.all(
            regCourse.exams.map(async (exam) => {
              const s = await getSolution(userId, exam).catch((err) => {
                throw err;
              });
              if (s) {
                const elements = s.grade.split('/');
                const percentage = (parseInt(elements[0]) / parseInt(elements[1])) * 100;
                if (percentage >= 50) {
                  return true;
                }
              } else {
                return false;
              }
            })
          );
          const output = results.reduce((a, b) => a && b, true);
          if (output) {
            sendCertificateEmail(userId, courseId).catch((err) => {
              console.log(err);
            });
            await RegisteredCourses.findByIdAndUpdate(reg._id, { emailSent: 'true' });
            console.log('User has completed course and email will be sent.');
            console.log('Background function terminating...');
            schedule.scheduledJobs[reg._id + 'email'].cancel();
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  });

  res.status(200).json({ statusCode: 200, success: true, message: 'User registered successfully' });
});

const getAllNotes = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { courseId, videoId } = req.query;
  const reg = await RegisteredCourses.findOne({
    userId: userId,
    courseId: courseId
  }).populate('videosNotes.notes');
  var notes = [];
  const found = reg.videosNotes.find(
    (videoNotes) => videoNotes.video.toString() === videoId.toString()
  );
  if (!found) {
    await RegisteredCourses.findOneAndUpdate(
      { userId: userId, courseId: courseId },
      { $push: { videosNotes: { video: videoId } } }
    );
  } else {
    notes = found.notes;
  }
  res.status(200).json({
    message: 'Successfully retrieved notes',
    statusCode: 200,
    success: true,
    payload: { notes }
  });
});

const updateNotes = asyncHandler(async (req, res) => {
  const { courseId, videoId } = req.query;
  const userId = res.locals.userId;
  const { notes } = req.body;
  const reg = await RegisteredCourses.findOne({
    courseId: courseId,
    userId: userId
  });
  const newNotesIds = notes.map((note, index) => {
    if (note._id) {
      return note._id.toString();
    } else {
      return '-1';
    }
  });
  const newNotes = await Promise.all(
    notes.map(async (note, index) => {
      var returnNote;
      if (note._id) {
        returnNote = await updateNote(note._id, note);
      } else {
        returnNote = await createNote(note);
      }
      return returnNote;
    })
  );
  const found = reg.videosNotes.find(
    (videoNotes) => videoNotes.video.toString() === videoId.toString()
  );

  if (found) {
    const oldNotesIds = found.notes;
    oldNotesIds.map((note, index) => {
      if (!newNotesIds.includes(note.toString())) {
        deleteNote(note);
      }
    });
    await RegisteredCourses.findOneAndUpdate(
      { userId: userId, courseId: courseId },
      { $pull: { videosNotes: { video: videoId } } }
    );
    await RegisteredCourses.findOneAndUpdate(
      { userId: userId, courseId: courseId },
      {
        $push: {
          videosNotes: {
            video: videoId,
            notes: newNotes
          }
        }
      }
    );
  } else {
    const obj = {
      video: videoId,
      notes: newNotes
    };
    await RegisteredCourses.findOneAndUpdate(
      { userId: userId, courseId: courseId },
      { $push: { videosNotes: obj } }
    );
  }
  res.status(200).json({ message: 'Notes updated successfully', statusCode: 200, success: true });
});

// const editExercise = async (exerciseId, newExercise) => {
//   const exercise = await Exercise.findByIdAndUpdate(exerciseId, newExercise);
//   return exercise;
// };

// const getExercise = async (exerciseId) => {
//   const exercise = await Exercise.findById(exerciseId);
//   return exercise;
// };

// const deleteExercise = async (exerciseId) => {
//   await Exercise.findByIdAndDelete(exerciseId);
// };

module.exports = {
  registerUser,
  getAllRegisteredCourses,
  getAllNotes,
  updateNotes
};
