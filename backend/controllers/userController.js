const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const Subtitle = require('../models/subtitleModel');
const CourseData = require('../models/courseModel');
const dotenv = require('dotenv').config();

const { convert } = require('exchange-rates-api');
// Adminstrator function
// As an Adminstrator add another adminstrator and assign their username and password

const addUser = async (req, res) => {
  console.log(req.body);
  const admin = await User.create({
    username: req.body.Username,
    //email: req.body.email,
    password: req.body.Password,
    userType: req.body.type
  });
  res.status(200).json(admin);
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

const editUser = async (req, res) => {
  const { username, email, biography, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({
      username: username
    });
    console.log(user);
    if (user.userType == 'instructor') {
      user.email = email || user.email;
      user.biography = biography || user.biography;
    }
    user.password = password || user.password;
    await User.findOneAndUpdate({ username: user.username }, user);
  } catch (err) {
    res.status(200).json({ mssg: err.message });
  }
  res.status(200).json({ mssg: 'success' });
};


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

  try {
    const user = await User.findOne({
      _id: user_id
    });
    console.log(user);
    if (user && user.country) {
      country = user.country;
    }
  } catch (err) {
    console.log(err);
  }

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
  changePassword,
  editUser,
  instructorViewCourses,
  instructorCreateCourse,
  instructorCreateSubtitle,
  getCountry
};
