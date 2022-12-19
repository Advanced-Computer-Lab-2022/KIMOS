const Course = require('../models/courseModel');
const Subject = require('../models/subjectModel');
const User = require('../models/userModel');
const RegisteredCourse = require('../models/registeredCoursesModel');
const {
  createSubtitle,
  updateSubtitle,
  deleteSubtitle,
  addQuiz,
  deleteQuiz,
  editQuiz
} = require('./subtitleController');
const { createExam, getExam, editExam, deleteExam } = require('./examController');
const { viewRating, createRating, updateRating } = require('./ratingController');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const { createSolution, getSolution } = require('./userSolutionController');
const { getExercise } = require('./exerciseController');
const asyncHandler = require('express-async-handler');

const getCourseInfo = async (courseId) => {
  return await Course.findById(courseId);
};

const removeExam = asyncHandler(async (req, res) => {
  const { courseId, examId } = req.query;
  await deleteExam(examId).catch((err) => {
    throw err;
  });
  await Course.findByIdAndUpdate(courseId, { $pull: { exams: examId } });
  res.status(200).json({ success: true, statusCode: 200, message: 'Exam deleted successfully' });
});

const createCourse = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { course } = req.body;
  const subject = await Subject.findOne({ name: course.subject });
  if (subject) {
    var subtitles = [];
    var totalHours = 0;
    if (course.subtitles.length) {
      const promises = course.subtitles.map(async (subtitle, index) => {
        const sub = await createSubtitle(subtitle).catch((err) => {
          throw err;
        });
        return sub;
      });
      subtitles = await Promise.all(promises);
      subtitles.map((subtitle, index) => {
        totalHours += parseFloat(subtitle.hours);
      });
    }
    await Course.create({
      title: course.title,
      subject: subject._id,
      subtitles: subtitles,
      price: course.price,
      totalHours: totalHours,
      summary: course.summary || '',
      exams: [],
      preview: course.preview || '',
      instructor: userId
    });
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Course created successfully'
    });
  } else {
    res.status(500);
    throw new Error('Subject not approved by admin');
  }
});

const findCourses = asyncHandler(async (req, res) => {
  const resultsPerPage = req.query.resultsPerPage || 10;
  var courses = [];
  const instructorId = req.query.instructorSearch ? res.locals.userId : -1;
  let page = req.query.page ? req.query.page : 1;
  const keyword = req.query.keyword || '';
  page = page >= 1 ? page - 1 : page;
  const instructor_details = await User.find({
    $and: [
      { userType: 'instructor' },
      { $or: [{ firstName: new RegExp(keyword, 'i') }, { lastName: new RegExp(keyword, 'i') }] }
    ]
  });
  const instructorIds = instructor_details.map((instructor, index) => {
    return instructor._id;
  });
  const subject_names = await Subject.find({
    name: new RegExp(keyword, 'i')
  });
  const subjectIds = subject_names.map((subject, index) => {
    return subject._id;
  });
  const populateFunction = async (results) => {
    const returnResult = await Promise.all(
      results.map(async (result, index) => {
        result = await result.populate('instructor', 'firstName lastName');
        result = await result.populate('subject');
        if (instructorId !== -1) {
          if (result.subtitles.length) {
            result = await result.populate('subtitles').then(async (resultSub, index) => {
              return await resultSub
                .populate('subtitles.quizzes')
                .then(async (resultQuiz, index) => {
                  return await resultQuiz
                    .populate('subtitles.quizzes.exercises')
                    .then(async (resultVideos, index) => {
                      return await resultVideos.populate('subtitles.videos');
                    });
                });
            });
          }
          if (result.exams.length) {
            result = await result.populate('exams').then(async (resultExam, index) => {
              return await resultExam.populate('exams.exercises');
            });
          }
        } else {
          var registered = false;
          if (res.locals.userId) {
            const check = await RegisteredCourse.findOne({
              userId: res.locals.userId,
              courseId: result._id
            });
            if (check) {
              registered = true;
            }
          }
          if (result.subtitles.length) {
            if (!registered) {
              result = await result
                .populate('subtitles', 'title hours quizzes')
                .then(async (resultSub, index) => {
                  return await resultSub.populate('subtitles.quizzes', 'title');
                });
            } else {
              result = await result.populate('subtitles').then(async (resultSub) => {
                return await resultSub.populate('subtitles.videos');
              });
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
                  }
                  return {
                    title: subtitle.title,
                    hours: subtitle.hours,
                    videos: subtitle.videos,
                    quizzes: []
                  };
                })
              );
              result = { ...result.toObject(), subtitles: newSubtitles };
            }
          }
          if (result.exams.length) {
            if (!registered) {
              result = await result.populate('exams', 'title');
            } else {
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
            }
          }
          result = { registered, ...result };
        }
        return result;
      })
    );
    return returnResult;
  };
  var displayString = '_id title subject summary preview rating totalHours subtitles exams ';
  if (!res.locals.corporate) displayString += 'price discount ';
  if (instructorId !== -1) displayString += 'visibility';
  else displayString += 'instructor';

  if (instructorId !== -1) {
    courses = await Course.find({
      $and: [
        {
          instructor: instructorId
        },
        {
          $or: [
            { title: new RegExp(keyword, 'i') },
            { subject: { $in: subjectIds } },
            { instructor: { $in: instructorIds } }
          ]
        }
      ]
    })
      .select(displayString)
      .skip(resultsPerPage * page)
      .limit(resultsPerPage);
  } else {
    courses = await Course.find({
      $and: [
        {
          visibility: 'public'
        },
        {
          $or: [
            { title: new RegExp(keyword, 'i') },
            { subject: { $in: subjectIds } },
            { instructor: { $in: instructorIds } }
          ]
        }
      ]
    })
      .select(displayString)
      .skip(resultsPerPage * page)
      .limit(resultsPerPage);
  }
  const returnResult = await populateFunction(courses).catch((err) => {
    throw err;
  });
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Courses fetched successfully!',
    payload: returnResult
  });
});

const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    success: true,
    message: 'Successfully retrieved',
    statusCode: 200,
    payload: subjects
  });
});
const addNewSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.create({ name: req.body.subject });
  res.status(200).json({ success: true, message: 'Successfully inserted', statusCode: 200 });
});

const addDiscount = async (courseId, discount) => {
  const { startDate, endDate } = discount.duration;
  const startJob = schedule.scheduledJobs[courseId + 'start'];
  const endJob = schedule.scheduledJobs[courseId + 'end'];
  if (startJob) startJob.cancel();
  if (endJob) endJob.cancel();
  var returnDiscount = {};
  var todayDate = new Date();
  console.log(new Date(startDate));
  if (todayDate >= new Date(startDate)) {
    if (todayDate < new Date(endDate)) {
      returnDiscount = discount;
      schedule.scheduleJob(courseId + 'end', endDate, async function () {
        try {
          console.log(
            `Background function run to remove discount of value: ${discount.amount} for course ${courseId}`
          );
          await Course.findByIdAndUpdate(courseId, { discount: {} }, { new: true });
          console.log(`discount removed`);
        } catch (err) {
          console.log(err);
        }
      });
    }
  } else {
    if (todayDate.getDate() < new Date(endDate)) {
      schedule.scheduleJob(courseId + 'start', startDate, async function () {
        try {
          console.log(
            `Background function run to insert discount of value: ${discount.amount} for course ${courseId}`
          );
          await Course.findByIdAndUpdate(courseId, { discount: discount });
          console.log(`discount inserted`);
        } catch (err) {
          console.log(err);
        }
      });
      schedule.scheduleJob(courseId + 'end', endDate, async function () {
        try {
          console.log(
            `Background function run to remove discount of value: ${discount.amount} for course ${courseId}`
          );
          await Course.findByIdAndUpdate(courseId, { discount: {} }, { new: true });
          console.log(`discount removed`);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
  return returnDiscount;
};

// const viewCourseTrainee = asyncHandler(async (req, res) => {
//   const userId = res.locals('userId');
//   const { courseId } = req.query;
//   var courseInfo = await Course.findById(courseId);
//   var examsArray = [];
//   var subtitlesArray = [];
//   var course = await Course.findById(courseId);
//   if (res.locals.registered) {
//     if (courseInfo.subtitles.length) {
//       const courseSubtitles = await course.populate('subtitles');
//       subtitlesArray = courseSubtitles.subtitles;
//       courseInfo.subtitles.quizzes.map(async (quiz, index) => {
//         const s = await getSolution(userId, quiz);
//         if (s) {
//           return {
//             _id: ex._id,
//             title: ex.title,
//             solved: true,
//             grade: s.grade
//           };
//         } else {
//           const ex = await getExam(quiz, false);
//           return {
//             _id: ex._id,
//             title: ex.title,
//             solved: false
//           };
//         }
//       });
//     }
//     if (courseInfo.exams.length) {
//       examsArray = await Promise.all(
//         courseInfo.exams.map(async (exam, index) => {
//           const s = await getSolution(userId, exam);
//           const ex = await getExam(exam, false);
//           if (s) {
//             return {
//               _id: ex._id,
//               title: ex.title,
//               solved: true,
//               grade: s.grade
//             };
//           } else {
//             return {
//               _id: ex._id,
//               title: ex.title,
//               solved: false
//             };
//           }
//         })
//       );
//     }
//   }
//   courseInfo = await courseInfo.populate('instructor', 'firstName lastName');
//   res.status(200).json({
//     _id: courseInfo._id,
//     registered: res.locals.registered,
//     discount: res.locals.corporate ? -1 : courseInfo.discount,
//     title: courseInfo.title,
//     price: res.locals.corporate ? -1 : courseInfo.price,
//     totalHours: courseInfo.totalHours,
//     subject: courseInfo.subject,
//     instructor: courseInfo.instructor,
//     preview: courseInfo.preview,
//     subtitles: subtitles.array.length ? subtitles.array : courseInfo.subtitles,
//     summary: courseInfo.summary,
//     averageRating: courseInfo.rating,
//     exams: examsArray.length ? examsArray : courseInfo.exams
//   });
// });

const addExam = asyncHandler(async (req, res) => {
  const { courseId } = req.query;
  const { exam } = req.body;
  await Course.findById(courseId);
  const ex = await createExam(exam).catch((err) => {
    throw err;
  });
  await Course.findByIdAndUpdate(courseId, {
    $push: { exams: ex }
  });
  res.status(200).json({ success: true, statusCode: 200, message: 'Exam added successfully' });
});

const findExam = asyncHandler(async (req, res) => {
  const userId = res.locals.userId.toString();
  const { courseId, examId } = req.query;
  const courseInfo = await Course.findById(courseId);
  if (userId === courseInfo.instructor.toString()) {
    const exam = await getExam(examId, true).catch((err) => {
      throw err;
    });
    res
      .status(200)
      .json({ success: true, statusCode: 200, message: 'Instructor exam fetched', payload: exam });
  } else {
    const registration = await RegisteredCourse.findOne({
      userId: res.locals.userId,
      courseId: req.query.courseId
    });
    if (registration) {
      const exam = await getExam(examId, false);
      res
        .status(200)
        .json({ success: true, statusCode: 200, message: 'Trainee exam fetched', payload: exam });
    } else {
      res.status(401);
      throw new Error('Unauthorized access');
    }
  }
});

const modifyExam = asyncHandler(async (req, res) => {
  const { examId } = req.query;
  const { exercises } = req.body;
  await editExam(examId, exercises).catch((err) => {
    throw err;
  });
  res.status(200).json({ success: true, statusCode: 200, message: 'Exam updated' });
});

const editCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.query;
  const { course, flagDiscount } = req.body;
  var subtitles;
  var discount;
  var totalHours = 0;
  var subject;
  console.log(new Date());
  subject = await Subject.findById(course.subject);
  if (!subject) {
    subject = await Subject.findOne({ name: course.subject });
    if (!subject) {
      res.status(500);
      throw new Error('Subject not approved by admin');
    }
  }
  if (flagDiscount === 'true') {
    discount = await addDiscount(courseId, course.discount).catch((err) => {
      throw err;
    });
  }
  const oldCourse = await Course.findById(courseId);
  let subtitleIds = course.subtitles.map((subtitle) => {
    const subtitleId = subtitle._id;
    if (subtitleId) {
      return subtitleId.toString();
    }
    return '-1';
  });
  oldCourse.subtitles.map(async (subtitleId, index) => {
    if (!subtitleIds.includes(subtitleId.toString())) {
      await deleteSubtitle(subtitleId).catch((err) => {
        throw err;
      });
    }
  });
  subtitles = await Promise.all(
    course.subtitles.map(async (subtitle, index) => {
      var sub;
      if (subtitle._id) {
        sub = await updateSubtitle(subtitle._id, subtitle).catch((err) => {
          throw err;
        });
      } else {
        sub = await createSubtitle(subtitle).catch((err) => {
          throw err;
        });
      }
      return sub;
    })
  );
  subtitles.map((subtitle, index) => {
    totalHours += parseFloat(subtitle.hours);
  });
  await Course.findByIdAndUpdate(courseId, {
    title: course.title,
    subtitles: subtitles,
    subject: subject.id,
    summary: course.summary,
    price: course.price,
    discount: discount ? discount : oldCourse.discount,
    totalHours: totalHours,
    preview: course.preview
  });
  res.status(200).json({ success: true, statusCode: 200, message: 'Edited course successfully' });
});

const rateCourse = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { courseId } = req.query;
  const { rating } = req.body;
  var newRating = 0;
  const courseInfo = await Course.findById(courseId);
  const check = await viewRating(userId, courseId);
  const currRating = courseInfo.rating;
  if (check) {
    await updateRating(userId, courseId, rating).catch((err) => {
      throw err;
    });
    newRating =
      (currRating.value * currRating.numberOfRatings - check.rating + rating) /
      currRating.numberOfRatings;
    await Course.findByIdAndUpdate(courseId, {
      rating: { value: newRating, numberOfRatings: currRating.numberOfRatings }
    });
  } else {
    await createRating(userId, courseId, rating).catch((err) => {
      throw err;
    });
    newRating =
      (currRating.value * currRating.numberOfRatings + rating) / (currRating.numberOfRatings + 1);
    await Course.findByIdAndUpdate(courseId, {
      rating: { value: newRating, numberOfRatings: currRating.numberOfRatings + 1 }
    });
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Rating updated successfully',
    payload: { userRating: rating, averageRating: newRating }
  });
});

const submitSolution = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { examId } = req.query;
  const { solutions } = req.body;
  const grade = await createSolution(userId, examId, solutions).catch((err) => {
    throw err;
  });
  res.status(200).json({
    success: true,
    statusCode: 200,
    payload: { grade: grade },
    message: 'Exam solutions uploaded successfully'
  });
});

// const getGradeAndSolution = async (userId, examId) => {
//   const s = await getSolution(userId, examId);
//   const examDetails = await getExam(examId);
//   if (s) {
//     const { grade, solutions } = s;
//     const promises = solutions.map(async (solution, index) => {
//       const correctSolution = await getExercise(solution.exercise);
//       var solutionObject = {
//         _id: correctSolution._id,
//         question: correctSolution.question,
//         choices: correctSolution.choices,
//         correctAnswer: correctSolution.answer,
//         userAnswer: solution.choice
//       };
//       return solutionObject;
//     });
//     const returnSolutions = await Promise.all(promises);
//     return {
//       _id: examId,
//       title: examDetails.title,
//       solved: true,
//       grade: grade,
//       solution: returnSolutions
//     };
//   } else {
//     var d = await examDetails.populate('exercises');
//     return {
//       _id: d._id,
//       title: d.title,
//       exercises: d.exercises,
//       solved: false
//     };
//   }
// };

const getExamSolution = asyncHandler(async (req, res) => {
  const { examId } = req.query;
  const examInfo = await getExam(examId, true).catch((err) => {
    throw err;
  });
  const { grade, solutions } = await getSolution(res.locals.userId, examId).catch((err) => {
    throw err;
  });
  const promises = solutions.map(async (solution, index) => {
    const correctSolution = await getExercise(solution.exercise).catch((err) => {
      throw err;
    });
    var solutionObject = {
      _id: correctSolution._id,
      question: correctSolution.question,
      choices: correctSolution.choices,
      correctAnswer: correctSolution.answer,
      userAnswer: solution.choice
    };
    return solutionObject;
  });
  const returnSolutions = await Promise.all(promises);
  const returnObject = {
    _id: examId,
    grade: grade,
    title: examInfo.title,
    solutions: returnSolutions
  };
  res.status(200).json({
    statusCode: 200,
    success: true,
    payload: returnObject,
    message: 'Solutions retrieved successfully'
  });
});

module.exports = {
  getCourseInfo,
  getAllSubjects,
  addNewSubject,
  findCourses,
  createCourse,
  modifyExam,
  findExam,
  addExam,
  editCourse,
  rateCourse,
  removeExam,
  submitSolution,
  getExamSolution
};
