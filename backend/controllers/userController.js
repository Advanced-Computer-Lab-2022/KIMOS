const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const CC = require('currency-converter-lt');

//All user functions

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

const userViewRegisteredCourses = async (req, res) => {
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

const getUser = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
    return;
  } catch (err) {
    res.status(200).json({ mssg: err.message });
    return;
  }
};

const editUser = async (req, res) => {
  const { user, email, bio } = req.body;
  try {
    const userInfo = await User.findOne({
      id: user.userId
    });
    if (user.userType == 'instructor') {
      userInfo.email = email || user.email;
      userInfo.biography = bio || user.biography;
    }
    await User.findByIdAndUpdate(user.userId, userInfo);
  } catch (err) {
    res.status(200).json({ message: err.message });
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

const addUser = async (req, res) => {
  try {
    if (req.body.userType === 'administrator') {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.type
      });
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  getCountry,
  changeCountry,
  getRate,
  addUser,
  editUser,
  changePassword,
  getUser
};
