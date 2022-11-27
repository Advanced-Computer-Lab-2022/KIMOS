const Course = require('../models/courseModel');
const User = require('../models/userModel');
const { createSubtitle, updateSubtitle } = require('./subtitleController');
const { createExam, getExam } = require('./examController');
const { viewRating, createRating, updateRating } = require('./ratingController');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const { createSolution, getSolution } = require('./userSolutionController');

const createCourse = async (req, res) => {
  try {
    const { user } = req.query;
    const { course } = req.body;
    var subtitles = [];
    if (user.userType === 'instructor') {
      var totalHours = 0;
      if (course.subtitles) {
        const promises = course.subtitles.map(async (subtitle, index) => {
          const sub = await createSubtitle(subtitle);
          return sub;
        });
        subtitles = await Promise.all(promises);
        subtitles.map((subtitle, index) => {
          totalHours += parseInt(subtitle.hours);
        });
      }
      const newCourse = await Course.create({
        title: course.title,
        subject: course.subject,
        subtitles: subtitles,
        price: course.price,
        totalHours: totalHours,
        summary: course.summary || '',
        exercises: [],
        preview: course.preview || '',
        instructor: user.userId
      });
      res.status(200).json({ message: 'Course created successfully' });
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findCourses = async (req, res) => {
  const resultsPerPage = 10;
  var courses = [];
  const instructorId = req.query.instructorSearch ? req.query.user.userId : -1;
  let page = req.query.page ? req.query.page : 1;
  const keyword = req.query.keyword || '';
  page = page >= 1 ? page - 1 : page;

  const instructor_details = await User.find({
    name: new RegExp(keyword, 'i'),
    userType: 'instructor'
  });
  const instructorIds = instructor_details.map((instructor, index) => {
    return instructor._id;
  });

  if (instructorId != -1) {
    //console.log(instructorId);
    courses = await Course.find({
      $and: [
        {
          instructor: instructorId,
          $or: [
            { title: new RegExp(keyword, 'i') },
            { subject: new RegExp(keyword, 'i') },
            { instructor: { $in: instructorIds } }
          ]
        }
      ]
    })
      .skip(resultsPerPage * page)
      .limit(resultsPerPage)
      .then(async (results) => {
        const promises = results.map(async (result, index) => {
          if (result.subtitles.length) result = await result.populate('subtitles');
          if (result.exams.length) {
            result = await result.populate('exams');
            // result.exams = await result.exams.populate('exercises');
            var promises = result.exams.map(async (e) => {
              return await e.populate('exercises');
            });
            result.exams = await Promise.all(promises);
            console.log(result.exams);
          }

          return result;
        });
        const returnResult = await Promise.all(promises);
        return res.status(200).json(returnResult);
      })
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  } else {
    await Course.find({
      $or: [
        { title: new RegExp(keyword, 'i') },
        { subject: new RegExp(keyword, 'i') },
        { instructor: { $in: instructorIds } }
      ]
    })
      .skip(resultsPerPage * page)
      .limit(resultsPerPage)
      .then(async (results) => {
        const promises = results.map(async (result, index) => {
          if (result.subtitles.length) result = await result.populate('subtitles', 'title');
          if (result.exams.length) {
            result = await result.populate('exams', 'title');
            //result.exams = await result.exams.populate('exercises', '--answer');
          }
          return result;
        });
        const returnResult = await Promise.all(promises);
        return res.status(200).json(returnResult);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
};

const findSubjects = async (req, res) => {
  const subjects = await Course.find().distinct('subject');
  res.json({ subjects });
};

const addDiscount = async (courseId, discount) => {
  const { startDate, endDate } = discount.duration;
  const startJob = schedule.scheduledJobs(courseId + 'start');
  const endJob = schedule.scheduledJobs(courseId + 'end');
  if (startJob) startJob.cancel();
  if (endJob) endJob.cancel();
  var returnDiscount = {};
  var todayDate = new Date();
  if (todayDate >= startDate) returnDiscount = discount;
  else {
    const job1 = schedule.scheduleJob(courseId + 'start', startDate, async function (title) {
      const course = await Course.findByIdAndUpdate(courseId, { discount: discount });
    });
    //console.log(job1);
  }
  const job2 = schedule.scheduleJob(courseId + 'end', endDate, async function (title) {
    const courseUpdate = await Course.findByIdAndUpdate(courseId, { discount: {} }, { new: true });
    return courseUpdate;
  });
  //console.log(job2);
  return returnDiscount;
};

const viewCourse = async (req, res) => {
  const { userId, courseId } = req.query;
  try {
    var courseInfo = Course.findById(courseId);
    if (courseInfo.registeredUsers.includes(mongoose.Types.ObjectId(userId))) {
      const course = await Course.findById(courseId);
      if (courseInfo.subtitles.length) courseInfo = await course.populate('subtitles');
      if (courseInfo.exams.length) courseInfo = await course.populate('exams');
      const promises = courseInfo.exams.map(async (exam, index) => {
        const ex = await getExam(exam._id, false);
        return ex;
      });
      courseInfo.exams = Promise.all(promises);
      res.status(200).json(courseInfo);
    } else {
      const course = await Course.findById(courseId);
      if (courseInfo.subtitles.length) courseInfo = await course.populate('subtitles', 'title');
      if (courseInfo.exams.length) courseInfo = await course.populate('exams', 'title');
      res.status(200).json(courseInfo);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addExam = async (req, res) => {
  const { user } = req.query;
  const { courseId, exercises } = req.body;
  const courseInfo = await Course.findById(courseId);
  if (mongoose.Types.ObjectId(user.userId).equals(courseInfo.instructor)) {
    try {
      const exam = await createExam(exercises);
      await Course.findByIdAndUpdate(courseId, {
        $push: { exams: exam }
      });
      res.status(200).json({ message: 'Successful' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

const findExam = async (req, res) => {
  const { userId, courseId, examId } = req.body;
  const courseInfo = await Course.findById(courseId);
  if (userId === courseInfo.instructor) {
    try {
      const exam = getExam(examId, true);
      res.status(200).json({ exam });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    if (courseInfo.registeredUsers.includes(userId)) {
      const exam = getExam(examId, false);
      res.status(200).json({ exam });
    }
  }
};

const modifyExam = async (req, res) => {
  const { user, courseId, exercises } = req.body;
  const courseInfo = await getCourse(courseId);
  if (user.userId === courseInfo.instructor) {
    try {
      const exam = editExam(exercises);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

const editCourse = async (req, res) => {
  const { user } = req.query;
  const { courseId, course, flagDiscount } = req.body;
  const courseInfo = await Course.findById(courseId);
  const userId = mongoose.Types.ObjectId(user.userId);
  console.log(courseInfo.instructor);
  if (userId.equals(courseInfo.instructor)) {
    if (flagDiscount === 'true') {
      console.log('wee');
      course.discount = await addDiscount(courseId, course.discount);
    }
    promises = course.subtitles.map(async (subtitle, index) => {
      var sub;
      if (subtitle._id) {
        sub = await updateSubtitle(subtitle._id, subtitle);
      } else {
        sub = await createSubtitle(subtitle);
      }
      return sub;
    });
    course.subtitles = await Promise.all(promises);
    await Course.findByIdAndUpdate(courseId, course);

    res.status(200).json({ message: 'Successful' });
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

const rateCourse = async (req, res) => {
  try {
    const { courseId, userId, rating } = req.body;
    await updateRating(userId, courseId, rating);
    const currRating = Course.findById(courseId).rating;
    const newRating =
      currRating.value * currRating.numberOfRatings + rating / currRating.numberOfRatings + 1;
    Course.findByIdAndUpdate(courseId, {
      rating: newRating,
      numberOfRatings: currRating.numberOfRatings + 1
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
  res.status(200).json({ message: 'Course Rated Successfully!' });
};

const submitSolution = async (req, res) => {
  const { userId, courseId, examId } = req.query;
  const { userSolutions } = req.body;
  try {
    const courseInfo = await Course.findById(courseId);
    if (
      courseInfo.registeredUsers.length &&
      courseInfo.registeredUsers.includes(mongoose.Types.ObjectId(userId))
    ) {
      createSolution(userId, examId, userSolutions);
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  res.status(200).json({ message: 'Exam solutions uploaded successfully' });
};

const getGradeAndSolution = async (req, res) => {
  const { userId, courseId, examId } = req.body;
  const correctAnswers = 0;
  try {
    const courseInfo = await Course.findById(courseId);
    if (
      courseInfo.registeredUsers.length &&
      courseInfo.registeredUsers.includes(mongoose.Types.ObjectId(userId))
    ) {
      const solutionArray = await getSolution(userId, examId);
      const promises = userSolutions.solutions.map(async (solution, index) => {
        const { exercise, choice } = await solution.populate('exercise');
        if (choice === exercise.answer) {
          correctAnswers += 1;
        }
        return solution;
      });
      const returnSolutions = await Promise.all(promises);
      const grade = correctAnswers + '/' + solutionArray.solutions.length;
      res.status(200).json({ grade: grade, solutions: returnSolutions });
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  findSubjects,
  findCourses,
  createCourse,
  viewCourse,
  modifyExam,
  findExam,
  addExam,
  editCourse,
  rateCourse,
  submitSolution,
  getGradeAndSolution
};
