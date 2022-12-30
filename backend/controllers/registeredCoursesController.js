const RegisteredCourses = require('../models/registeredCoursesModel');
const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Subtitle = require('../models/subtitleModel');
const Video = require('../models/videoModel');
const { getSolution } = require('./userSolutionController');
const { getExam } = require('./examController');
const { createNote, updateNote, deleteNote } = require('./noteController');

const { sendCertificateEmail } = require('../controllers/userController');
const asyncHandler = require('express-async-handler');
const schedule = require('node-schedule');
const { deleteSolution } = require('./userSolutionController');
const { addNotification } = require('./notificationController');

const getAllRegisteredCourses = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const reg = await RegisteredCourses.find({ userId: userId }).populate('courseId');
  var returnResult;
  if (reg) {
    returnResult = await Promise.all(
      reg.map(async (course, index) => {
        //console.log(result.progress);
        var result = course.courseId;
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
                  title: subtitle.title,
                  hours: subtitle.hours,
                  videos: subtitle.videos,
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
          const resSpread = { ...result };
          if (resSpread._doc) result = { ...result.toObject(), subtitles: newSubtitles };
          else result = { ...result, subtitles: newSubtitles };
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
          const resSpread = { ...result };
          console.log(result.progress);
          if (resSpread._doc)
            result = { ...result.toObject(), exams: exams, progress: course.progress };
          else result = { ...result, exams: exams, progress: course.progress };
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
  const courseId = res.locals.courseId;
  const courseInfo = await Course.findById(courseId);
  const userInfo = await User.findById(userId);
  if (userInfo.userType === 'corporate trainee') {
    await addNotification(
      userId,
      `Your request to access course ${courseInfo.title} has been accepted and the course has been added to your registered courses.`
    );
  }
  await RegisteredCourses.create({
    userId: userId,
    courseId: courseId,
    invoice: res.locals.invoiceId
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
            await addNotification(
              userId,
              `You have completed course ${courseInfo.title} and a certificate has been sent to your email.`
            );
            sendCertificateEmail(userId, courseId).catch((err) => {
              console.log(err);
            });
            await RegisteredCourses.findByIdAndUpdate(reg._id, { emailSent: 'true' });
            console.log('User has completed course and email will be sent.');
            console.log('Background function terminating...');
            schedule.scheduledJobs[reg._id + 'email'].cancel();
          } else {
            console.log('Check done. No email sent');
          }
        } else {
          console.log('Check done. No email sent');
        }
      } catch (err) {
        console.log(err);
      }
    });
  });

  res.status(200).json({ statusCode: 200, success: true, message: 'User registered successfully' });
});

const removeRegisteredUser = asyncHandler(async (req, res, next) => {
  const { refundedUserId, courseId } = res.locals;
  const reg = await RegisteredCourses.findOneAndDelete({
    userId: refundedUserId,
    courseId: courseId
  });
  reg.videosNotes.map(async (videoNotes, index) => {
    videoNotes.notes.map(async (note, index) => {
      await deleteNote(note);
    });
  });
  const course = await Course.populate(reg, 'courseId');
  const courseSubtitle = await Subtitle.populate(course, 'courseId.subtitles');
  courseSubtitle.courseId.subtitles.map(async (subtitle, index) => {
    subtitle.quizzes.map(async (quiz, index) => {
      await deleteSolution(refundedUserId, quiz);
    });
  });
  course.courseId.exams.map(async (exam, index) => {
    await deleteSolution(refundedUserId, exam);
  });
  res.locals.invoiceId = reg.invoice;
  const job = schedule.scheduledJobs[reg._id + 'email'];
  if (job) job.cancel();
  next();
});
const getAllRegisteredInvoices = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const registered = await RegisteredCourses.find({
    userId: userId
  });
  const invoices = await Promise.all(
    registered.map(async (registeredCourse, index) => {
      const registeredCourseInvoice = await registeredCourse.populate('invoice');
      const registeredCourseInvoiceCourseInfo = await registeredCourseInvoice.populate('courseId');
      var refundable = true;
      if (registeredCourse.progress >= 50) {
        refundable = false;
      }
      const refundRequest = await Request.findOne({
        userId: userId,
        courseId: registeredCourse.courseId,
        type: 'refund'
      });
      var status;
      if (refundRequest) {
        status = 'pending';
      } else {
        status = refundable ? 'refund' : 'noRefund';
      }
      return {
        _id: registeredCourse.courseId,
        courseName: registeredCourseInvoiceCourseInfo.courseId.title,
        date: registeredCourse.createdAt,
        status: status,
        price: registeredCourseInvoice.invoice.payment
      };
    })
  );
  res.status(200).json({
    message: 'Fetched all registered courses invoices successfully',
    statusCode: 200,
    success: true,
    payload: { invoices }
  });
});

const getAllNotesAndUpdateProgress = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { courseId, videoId } = req.query;
  const reg = await RegisteredCourses.findOne({
    userId: userId,
    courseId: courseId
  }).populate('videosNotes.notes');
  var newProgress = reg.progress;
  var notes = [];
  const found = reg.videosNotes.find(
    (videoNotes) => videoNotes.video.toString() === videoId.toString()
  );
  if (!found) {
    const video = await Video.findById(videoId);
    const course = await Course.findById(courseId);
    const videoHours = video.hours;
    const totalHours = course.totalHours;
    newProgress += videoHours / totalHours;
    await RegisteredCourses.findOneAndUpdate(
      { userId: userId, courseId: courseId },
      { $push: { videosNotes: { video: videoId } }, progress: newProgress }
    );
  } else {
    notes = found.notes;
  }
  res.status(200).json({
    message: 'Successfully retrieved notes',
    statusCode: 200,
    success: true,
    payload: { notes: notes, progress: newProgress }
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

const viewMostPopularCourses = asyncHandler(async (req, res) => {
  const sortedByCountCourses = await RegisteredCourses.aggregate([
    { $sortByCount: '$courseId' },
    { $limit: 10 }
  ]);
  const courses = await Course.populate(sortedByCountCourses, '_id');
  const instructor_details = await User.populate(courses, '_id.instructor');
  const returnCourses = instructor_details.map((course, index) => {
    return {
      _id: course._id._id,
      title: course._id.title,
      price: course._id.price,
      rating: course._id.rating,
      instructor:
        course._id.instructor.firstName +
        ' ' +
        course._id.instructor.lastName
    };
  });
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Fetched most popular courses successfully',
    payload: { returnCourses }
  });
});

module.exports = {
  registerUser,
  getAllRegisteredCourses,
  getAllNotesAndUpdateProgress,
  updateNotes,
  getAllRegisteredInvoices,
  viewMostPopularCourses,
  removeRegisteredUser
};
