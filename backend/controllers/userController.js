const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const { getSubtitle, createSubtitle, enterVideo } = require('./subtitleController');
const { createCourse, getCourse, enterPreviewVideo } = require('./courseController');
const { createExercise, getExercise, setAnswer } = require('./exerciseController');
const dotenv = require('dotenv').config();

const CC = require('currency-converter-lt');

//All user functions

const changeCountry = async (req, res) => {
  var user_id = '635d70dbf600410aab3c71b0';
  const newCountry = req.body.newCountry;

  try {
    await User.findByIdAndUpdate(user_id, { country: newCountry.code });
  } catch (err) {
    res.status(400).json({ mssg: 'error' });
    return;
  }

  res.status(200).json({ mssg: 'updated correctly' });
};

const getRate = async (req, res) => {
  const country = req.body.country;
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
const viewCourse = async (req, res) => {
  console.log(req.query);
  const { username, courseTitle } = req.query;
  try {
    const user = await User.findOne({ username: username });
    const course = await getCourse(courseTitle);
    if (user.courses.includes(course._id)) {
      const promises = course.subtitles.map(async (subtitle, index) => {
        const sub = await getSubtitle(subtitle._id);
        return sub;
      });
      var subtitles = await Promise.all(promises);
      course.subtitles = subtitles;
      if (course.exercises.length) {
        const promises = course.exercises.map(async (exercise, index) => {
          const ex = await getExercise(exercise._id);
          return ex;
        });
        var exercises = await Promise.all(promises);
        course.exercises = exercises;
      }
      res.status(201).json(course);
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
  res.status(200).json({ mssg: 'success' });
};

const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = User.findOne({ username: username });
  if (user.password === oldPassword) {
    user.findByIdAndUpdate(user._id, { password: newPassword });
  } else {
    res.status(400).json({ msg: 'Old password doesnt match' });
  }
  res.status(200).json({ msg: 'Ok' });
};

const getCountry = async (req, res) => {
  var user_id = '635d70dbf600410aab3c71b0';
  var country = null;

  try {
    const user = await User.findOne({
      _id: user_id
    });

    if (user && user.country.code) {
      country = user.country;
    } else {
      country = { code: 'EG', name: 'Egypt' };
    }
  } catch (err) {
    res.status(400).json({ mssg: 'error' });
    return;
  }

  res.status(400).json({ mssg: 'error' });
  return;
};
//Instructor Functions

const instructorViewCourses = async (req, res) => {
  try {
    const instructorCourses = await CourseData.find({
      instructor: '635d70dbf600410aab3c71b0'
    });
    res.status(201).json(instructorCourses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const instructorCreateCourse = async (req, res) => {
  const { user, course } = req.body;
  if (user.userType === 'instructor') {
    try {
      createCourse(course);
    } catch (err) {
      res.status(400).json(err.message);
    }
    res.status(200).json({ mssg: 'entered course succesfully' });
  }
};
const instructorCreateExercise = async (req, res) => {
  const { user, exercise } = req.body;
  if (user.type === 'instructor') {
    try {
      createExercise(exercise);
    } catch (err) {
      res.status(400).json(err.message);
    }
    res.status(200).json({ mssg: 'entered course succesfully' });
  }
};

const instructorCreateSubtitle = async (req, res) => {
  const { user, subtitle } = req.body;
  if (user.userType === 'instructor') {
    createSubtitle(subtitle);
  }
};

const instructorAddSubtitleVideo = async (req, res) => {
  const { user, title, video } = req.body;
  if (user.userType === 'instructor') {
    enterVideo(title, video);
  }
};

const instructorAddDiscount = async (req, res) => {
  const { user, title, discount } = req.body;
  if (user.userType === 'instructor') {
    enterVideo(title, discount);
  }
};

const instructorAddPreviewVideo = async (req, res) => {
  const { user, title, video } = req.body;
  if (user.userType === 'instructor') {
    enterPreviewVideo(title, video);
  }
};
const instructorSetAnswer = async (req, res) => {
  const { user, question, answer } = req.body;
  if (user.userType === 'instructor') {
    setAnswer(question, answer);
  }
};

//Admin functions

const addUser = async (req, res) => {
  console.log(req.body);
  const user = await User.create({
    username: req.body.Username,
    password: req.body.Password,
    userType: req.body.type
  });
  res.status(200).json(admin);
};

module.exports = {
  addUser,
  editUser,
  changePassword,
  instructorViewCourses,
  instructorCreateCourse,
  instructorCreateSubtitle,
  instructorCreateExercise,
  instructorAddSubtitleVideo,
  instructorAddPreviewVideo,
  instructorSetAnswer,
  instructorAddDiscount,
  viewCourse,
  getCountry,
  changeCountry,
  getRate,
  getInstructor
};
