const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const CC = require('currency-converter-lt');
const nodemailer = require('nodemailer');
const { updateRating } = require('./ratingController');

//All user functions

const getCountry = async (req, res) => {
  var { userId } = req.query;
  var country = null;
  try {
    const userInfo = await User.findById(userId);
    if (userInfo && userInfo.country) {
      country = userInfo.country;
    } else {
      country = { code: 'EG', name: 'Egypt' };
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
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
  const { countryCode } = req.query;
  var countryDetails = {};
  try {
    countryDetails = getAllInfoByISO(countryCode);
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
  const { userId, email, biography } = req.body;
  console.log(userId);
  try {
    const userInfo = await User.findById(userId);
    if (userInfo.userType == 'instructor') {
      userInfo.email = email || userInfo.email;
      userInfo.biography = biography || userInfo.biography;
    }
    await User.findByIdAndUpdate(userId, userInfo);
  } catch (err) {
    res.status(200).json({ message: err.message });
    return;
  }
  res.status(200).json({ message: 'Details edited' });
};

const changePassword = async (req, res) => {
  const { user } = req.query;
  const { oldPassword, newPassword } = req.body;
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
    if (req.query.userType === 'administrator') {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.type
      });
      res.status(200).json({ message: 'Successful' });
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const rateInstructor = async (res, req) => {
  try {
    const { userId, instructorId } = req.query;
    const { rating } = req.body;
    const ratedInstructor = await User.findOne(instructorId);
    updateRating(userId, instructorId, newRating);
    const currRating = ratedInstructor.rating;
    const newRating =
      currRating.value * currRating.numberOfRatings + rating / currRating.numberOfRatings + 1;
    User.findByIdAndUpdate(instructorId, {
      rating: newRating,
      numberOfRatings: currRating.numberOfRatings + 1
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
  res.status(200).json({ message: 'Instructor Rated Successfully!' });
};

const resetPasswordSendEmail = async (req, res) => {
  const { email } = req.body;
  const userInfo = await User.findOne({ email: email });
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: EMAIL_SUBJECT,
    text: `Hi ${userInfo.firstName},
    
    There was a request to change your password!
    
    If you did not make this request then please ignore this email.
    
    Otherwise, please click this link to change your password: ${'Link for forgot page in frontend goes here'}`
  };
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOneAndUpdate({ email: email }, { password: password });
    res.status(200).json({ message: Success });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCountry,
  changeCountry,
  getRate,
  addUser,
  editUser,
  changePassword,
  rateInstructor,
  resetPasswordSendEmail,
  resetPassword,
  getUser
};
