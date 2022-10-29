const User = require('../models/userModel');
const Subtitle = require('../models/subtitleModel');
const CourseData = require('../models/courseModel');

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
    const instructorCourses = await CourseData.find({ instructor: '635387b65b29f183de6e32d6' });
    res.status(201).json(instructorCourses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const instructorCreateCourse = async (req, res) => {
  const course = req.body;

  const promises = course.subtitles.map(async (subtitle, index) => {
    const sub = await instructorCreateSubtitle(subtitle);
    return sub;
  });
  var subtitles = await Promise.all(promises);
  console.log('Done');
  console.log(subtitles);

  const newCourse = await CourseData.create({
    title: course.title,
    subject: course.subject,
    subtitles: subtitles,
    price: course.price,
    summary: course.summary,
    instructor: course.instructor
  });
};

const getPrice = async (req, res) => {
  var user_id = '635136c4072311221109475d';
  let amount = await convert(2000, 'USD', 'EUR', '2018-01-01');
  console.log(amount);
};

const getCountry = async (req, res) => {
  var user_id = '635136c4072311221109475d';
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

    res.status(400).json({ mssg: 'error' });
    return;
  }

  res.status(200).json({ country: country });
};

const instructorCreateSubtitle = async (subtitle) => {
  const res = await Subtitle.create({
    Title: subtitle.Title,
    Hours: subtitle.Hours
  });
  //console.log('OOGa BOOGa');
  return res;
};
module.exports = {
  addUser,
  instructorViewCourses,
  instructorCreateCourse,
  instructorCreateSubtitle,
  getCountry
};
