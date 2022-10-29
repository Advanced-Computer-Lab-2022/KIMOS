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
  instructorViewCourses,
  instructorCreateCourse,
  instructorCreateSubtitle,
  getCountry
};
