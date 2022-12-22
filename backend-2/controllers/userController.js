const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const CC = require('currency-converter-lt');
const nodemailer = require('nodemailer');
const { updateRating, viewRating, createRating } = require('./ratingController');

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
  const { userId, email, biography, password, username } = req.body;
  console.log(userId);
  console.log(biography);

  try {
    const userInfo = await User.findById(userId);
    if (userInfo.userType == 'instructor') {
      userInfo.email = email || userInfo.email;
      userInfo.biography = biography || userInfo.biography;
      userInfo.password = password || userInfo.password;
      userInfo.username = username || userInfo.username;
    }
    await User.findByIdAndUpdate(userId, userInfo);
  } catch (err) {
    res.status(200).json({ message: err.message });
    return;
  }
  res.status(200).json({ message: 'Details edited' });
};

const changePassword = async (req, res) => {
  const { userId } = req.query;
  const { oldPassword, newPassword } = req.body;
  console.log(userId);
  const userInfo = await User.findById(userId);
  if (userInfo.password === oldPassword) {
    await User.findByIdAndUpdate(userId, { password: newPassword });
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

const rateInstructor = async (req, res) => {
  try {
    const { userId, instructorId } = req.query;
    const { rating } = req.body;
    var newRating = 0;
    const ratedInstructor = await User.findById(instructorId);
    const check = await viewRating(userId, instructorId);
    console.log(check);
    const currRating = ratedInstructor.rating;
    if (check) {
      await updateRating(userId, instructorId, rating);
      newRating =
        (currRating.value * currRating.numberOfRatings - check.rating + rating) /
        currRating.numberOfRatings;
      await User.findByIdAndUpdate(instructorId, {
        rating: { value: newRating, numberOfRatings: currRating.numberOfRatings }
      });
    } else {
      await createRating(userId, instructorId, rating);
      newRating =
        (currRating.value * currRating.numberOfRatings + rating) / (currRating.numberOfRatings + 1);
      await User.findByIdAndUpdate(instructorId, {
        rating: { value: newRating, numberOfRatings: currRating.numberOfRatings + 1 }
      });
    }
    res.status(200).json({ message: 'Instructor Rated Successfully!' });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err });
  }
};

const resetPasswordSendEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const userInfo = await User.findOne({ email: email });
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: process.env.EMAIL_SUBJECT,
    text: `Hi ${userInfo.firstName},
    
    There was a request to change your password!
    
    If you did not make this request then please ignore this email.
    
    Otherwise, please click this link to change your password: http://localhost:3000/passwordReset `
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Email sent successfully');
    }
  });
  res.status(200).json({ message: 'success' });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOneAndUpdate({ email: email }, { password: password });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log(err.message);
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