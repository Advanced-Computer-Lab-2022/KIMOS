const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const { getSubtitle, createSubtitle, enterVideo } = require('./subtitleController');
const { getContract, createContract, addInstructor } = require('./contractController');
const { getCoursesByInstructor } = require('./courseController');

const {
  createCourse,
  getCourse,
  enterPreviewVideo,
  addDiscount,
  addExercise,
  addSubtitle,
  findCourseBySubtitle,
  findCourseByExam
} = require('./courseController');
const { createExam, getExam, setAnswer } = require('./examController');
const dotenv = require('dotenv').config();

const CC = require('currency-converter-lt');

//All user functions

// const userGetExam = async (req, res) => {
//   try {
//     const { userId, examId } = req.query;
//     const courseInfo = await findCourseByExam(examId);
//     const userInfo = await User.findById(userId);
//     if (userInfo.courses.includes(courseInfo._id)) {
//       const exam = await getExam(examId, false);
//       return res.status(200).json({ exam: exam });
//     } else {
//       res.status(400).json({ message: 'Unauthorized access' });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// };

// const userGetSubtitle = async (req, res) => {
//   try {
//     const { userId, subtitleId } = req.query;
//     const courseInfo = await findCourseBySubtitle(subtitleId);
//     const userInfo = await User.findById(userId);
//     if (userInfo.courses.includes(courseInfo._id)) {
//       const sub = await getSubtitle(subtitleId);
//       return res.status(200).json({ subtitle: sub });
//     } else {
//       res.status(400).json({ message: 'Unauthorized access' });
//     }
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// };
const getCountry = async (req, res) => {
  var user_id = req.query;
  var country = null;
  try {
    const userInfo = await User.findById(user_id);
    if (userInfo && userInfo.country) {
      country = userInfo.country;
    } else {
      country = { code: 'EG', name: 'Egypt' };
    }
  } catch (err) {
    res.status(400).json({ message: err });
    return;
  }
  res.status(200).json({ country: country });
};

const changeCountry = async (req, res) => {
  var { userId } = req.query;
  const { newCountry } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { country: newCountry });
  } catch (err) {
    res.status(400).json({ message: err });
    return;
  }
  res.status(200).json({ message: 'Country updated' });
};

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


const getInstructor = async (req, res) => {
  // const { username, email, bio, password } = req.body;
  const { id } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({
      id: id
    });
    res.status(200).json(user);
    return;

// '635d70dbf600410aab3c71b0'
  } catch (err) {
    res.status(200).json({ mssg: err.message });
    return;
  }
};

const editUser = async (req, res) => {
  const { username, email, bio, password } = req.body;

  console.log(req.body);

  try {
    const user = await User.findOne({
      id: '635d70dbf600410aab3c71b0'
    });

    user.username = username || user.username;
    if (user.userType == 'instructor') {
      user.email = email || user.email;
      user.biography = bio || user.biography;
    }
    user.password = password || user.password;
    await User.findOneAndUpdate({  id: '635d70dbf600410aab3c71b0'}, user);
  } catch (err) {
    res.status(200).json({ mssg: err.message });
    return;
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

const instructorCreateCourse = async (req, res) => {
  const { user, course } = req.body;
  if (user.userType === 'instructor') {
    try {
      await createCourse(course);
      res.status(200).json({ message: 'Course Uploaded succesfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

const instructorViewCourses = async (req, res) => {
  console.log("here")
  const { instructorId } = req.query;
  try {
    //const userInfo = await User.findById(userId);
    const courses = await getCoursesByInstructor(instructorId);
    const promises = courses.map(async (course, index) => {
      const courseInfo = await course.populate('subtitles').populate('exams');
      const courseInfoExams = await courseInfo.exams.populate('exercises');
      return courseInfoExams;
    });
    var coursesInfo = [];
    coursesInfo = Promise.all(promises);

    res.status(200).json({'courses':coursesInfo});
  } catch (error) {
    res.status(400).json([]);
  }
};

const instructorCreateExam = async (req, res) => {
  const { user, courseId, exercises } = req.body;
  const courseInfo = await getCourse(courseId);
  if (user.userId === courseInfo.instructor) {
    try {
      const ex = createExam(exercises);
      addExercise(courseId, ex._id);
      res.status(200).json({ message: 'Exercise Uploaded Successfully' });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

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

const addContract = async (req, res) => {
  const { title, terms, percentage } = req.body;
  try {
    const contract = await createContract(title, terms, percentage);
  } catch (err) {
    res.status(400).json({ message: err });
  }
  res.status(200).json({ message: 'Contract entered successfully' });
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
  getRate,
  getInstructor
};
