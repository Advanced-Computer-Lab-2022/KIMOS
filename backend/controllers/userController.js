const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const Subtitle = require('../models/subtitleModel');
const CourseData = require('../models/courseModel');
const dotenv = require('dotenv').config();

const getRate = async (req, res) => {
  const country = req.query;
  var countryDetails = {};
  try {
    countryDetails = getAllInfoByISO(country.code);
  } catch (err) {
    return res.json({ symbol: '$', rate: 1 }); //send price to frontend
  }
  try {
    let currencyConverter = new CC({ from: 'USD', to: countryDetails.currency, amount: 1 });

    await currencyConverter.convert().then((response) => {
      return res.json({ symbol: countryDetails.symbol, rate: response }); //send price to frontend
    });
  } catch (err) {
    return res.json({ symbol: '$', rate: 1 }); //send price to frontend
  }
};

const userViewCourse = async (req, res) => {
  const { userId, courseId } = req.query;
  try {
    const userInfo = await User.findById(userId);
    if (userInfo.courses.includes(courseId)) {
      const course = await getCourse(courseId);
      const courseInfo = await course.populate('subtitles').populate('exams');
      const courseInfoExams = await courseInfo.exams.populate('exercises', '--answer');
      console.log(courseInfoExams);
      res.status(200).json(courseInfo);
    } else res.status(401).json({ message: 'Not registered to course' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const instructorViewCourse = async (req, res) => {
  const { userId, courseId } = req.query;
  try {
    const userInfo = await User.findById(userId);
    if (userInfo.courses.includes(courseId)) {
      const course = await getCourse(courseId);
      const courseInfo = await course.populate('subtitles').populate('exams');
      const courseInfoExams = await courseInfo.exams.populate('exercises');
      console.log(courseInfoExams);
      res.status(200).json(courseInfo);
    } else res.status(401).json({ message: 'Not registered to course' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  const { user, email, biography } = req.body;
  try {
    const userInfo = await User.findById(user.userId);
    if (user.userType == 'instructor') {
      userInfo.email = email || userInfo.email;
      userInfo.biography = biography || userInfo.biography;
    }
    await User.findByIdAndUpdate(user.userId, userInfo);
  } catch (err) {
    res.status(200).json({ message: err });
  }
  res.status(200).json({ message: 'Details edited' });
};

const changePassword = async (req, res) => {
  const { user, oldPassword, newPassword } = req.body;
  const userInfo = await User.findById(user.userId);
  if (userInfo.password === oldPassword) {
    await User.findByIdAndUpdate(user.userId, { password: newPassword });
  } else {
    res.status(400).json({ message: 'Old password doesnt match' });
  }
  res.status(200).json({ message: 'Password Updated Succesfully' });
};

//Instructor Functions

const instructorViewCourses = async (req, res) => {
  const userId = req.query;
  try {
    const instructorCourses = await CourseData.find({
      instructor: '635d70dbf600410aab3c71b0'
    });
    res.status(201).json(instructorCourses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const instructorCreateCourse = async (req, res) => {
  const course = req.body;
  console.log(req.body);

  const promises = course.subtitles.map(async (subtitle, index) => {
    const sub = await instructorCreateSubtitle(subtitle);
    return sub;
  });
  var subtitles = await Promise.all(promises);
  var totalHours = 0;
  //console.log(subtitles);
  subtitles.map((subtitle, index) => {
    totalHours += parseInt(subtitle.hours);
  });
  console.log(totalHours);
  // console.log('Done');
  // console.log(subtitles);

  const newCourse = await CourseData.create({
    title: course.title,
    subject: course.subject,
    subtitles: subtitles,
    price: course.price,
    totalHours: totalHours,
    summary: course.summary,
    exercises: course.exercises,
    instructor: course.instructor
  });
};
const getCountry = async (req, res) => {
  var user_id = '635d70dbf600410aab3c71b0';
  var country = null;

    res.status(200).json({ message: 'Video added successfully' });
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};
const instructorSetAnswer = async (req, res) => {
  const { user, courseId, exerciseId, questionId, answer } = req.body;
  try {
    const courseInfo = getCourse(courseId);
    if (user.userId === courseInfo.instructor) {
      setAnswer(exerciseId, questionId, answer);
      res.status(200).json({ message: 'Answer set successfully' });
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    console.log(err);
  }
};

// const instructorGetExam = async (req, res) => {
//   try {
//     const { userId, examId } = req.query;
//     const courseInfo = await findCourseByExam(examId);
//     if (courseInfo.instructor === userId) {
//       const exam = await getExam(examId, true);
//       return res.status(200).json({ message: exam });
//     } else {
//       res.status(400).json({ message: 'Unauthorized access' });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// };

  res.status(400).json({ mssg: 'error' });
  return;
};

const instructorCreateSubtitle = async (subtitle) => {
  const res = await Subtitle.create({
    title: subtitle.Title,
    hours: subtitle.Hours
  });
  return res;
};

module.exports = {
  addUser,
  addContract,
  editUser,
  changePassword,
  instructorViewCourses,
  instructorCreateCourse,
  instructorCreateSubtitle,
  instructorCreateExam,
  instructorAddSubtitleVideo,
  instructorAddPreviewVideo,
  instructorSetAnswer,
  instructorAddDiscount,
  instructorAcceptContract,
  instructorViewContract,
  instructorViewCourse,
  userViewCourse,
  getCountry,
  changeCountry,
  getRate
};
