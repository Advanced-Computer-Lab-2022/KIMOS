const { getAllInfoByISO } = require('iso-country-currency');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const CC = require('currency-converter-lt');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const { fillCertificate } = require('../pdfProducer/pdfFiller');
const { updateRating, viewRating, createRating } = require('./ratingController');
const { getCourseInfo } = require('./courseController');
const PDFDocument = require('pdfkit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const RegisteredCourses = require('../models/registeredCoursesModel');
const Request = require('../models/requestModel');
const Course = require('../models/courseModel');

//All user
const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, username, gender, country } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  if (firstName && lastName && email && password && username && gender) {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      userType: 'individual trainee',
      password: hashedPassword,
      gender: gender,
      wallet: 0,
      country: country || { name: 'Egypt', code: 'EG' },
      reset: 'false',
      firstLogIn: 'false'
    });
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
    res.status(200).json({ success: true, statusCode: 200, message: 'Sign Up Successful!' });
  } else {
    res.status(500);
    throw new Error('All fields must be defined');
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  var user = null;
  if (email) {
    user = await User.findOne({ email: email });
  } else {
    if (username) {
      user = await User.findOne({ username: username });
    }
  }
  if (user) {
    const flag = await bcrypt.compare(password, user.password);
    if (flag) {
      const id = user._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
      if (user.userType !== 'administrator') {
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Logged in Successfully',
          payload: { userType: user.userType, firstLogIn: user.firstLogIn }
        });
      } else {
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Logged in Successfully',
          payload: { userType: user.userType }
        });
      }
    } else {
      res.status(401);
      throw new Error('Incorrect password');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const logout = asyncHandler(async (req, res) => {
  // TODO Logout the user
  return res
    .clearCookie('jwt')
    .status(200)
    .json({ success: true, message: 'Successfully logged out', statusCode: 200 });
});

const getCountry = asyncHandler(async (req, res) => {
  var userId = res.locals.userId;
  var country = null;
  if (userId) {
    const userInfo = await User.findById(userId);
    country = userInfo.country;
  } else {
    country = { code: 'EG', name: 'Egypt' };
  }
  res.status(200).json({
    success: true,
    message: 'Country successfully retrieved',
    statusCode: 200,
    payload: country
  });
});

const changeCountry = asyncHandler(async (req, res) => {
  if (res.locals.userId) {
    var userId = res.locals.userId;
    const { newCountry } = req.body;
    const user = await User.findByIdAndUpdate(userId, { country: newCountry });
    res
      .status(200)
      .json({ success: true, message: 'Country successfully updated', statusCode: 200 });
  } else {
    res.status(404);
    throw new Error('User not in database');
  }
});

const getCountryIso = (countryCode) => {
  var countryDetails = {};
  try {
    countryDetails = getAllInfoByISO(countryCode);
    return countryDetails.currency;
  } catch (err) {
    return 'USD';
  }
};

const getCorrectPrice = async (countryIso) => {
  let currencyConverter = new CC({ from: 'USD', to: countryIso, amount: 1 });
  return await currencyConverter.convert();
};

const getRate = async (req, res) => {
  const { countryCode } = req.query;
  console.log(countryCode);
  var countryDetails = {};
  try {
    countryDetails = getAllInfoByISO(countryCode);
    console.log(countryDetails);
    let currencyConverter = new CC({ from: 'USD', to: countryDetails.currency, amount: 1 });
    await currencyConverter.convert().then((response) => {
      res.status(200).json({
        success: true,
        message: 'rate successfully retrieved',
        statusCode: 200,
        payload: { symbol: countryDetails.symbol, rate: response }
      });
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      message: 'rate retrieved as default value',
      statusCode: 200,
      payload: { symbol: '$', rate: 1 }
    });
  }
};

const getMe = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    message: 'User Successfully retrieved',
    statusCode: 200,
    payload: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      rating: user.rating,
      biography: user.biography,
      email: user.email
    }
  });
});

const viewInstructorDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.instructorId);
  res.status(200).json({
    success: true,
    message: 'User Successfully retrieved',
    statusCode: 200,
    payload: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      rating: user.rating,
      biography: user.biography
    }
  });
});

const editUser = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { firstName, lastName, email, biography, password, username } = req.body;
  const userInfo = await User.findById(userId);
  var hashedPassword = null;
  if (password) {
    const salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(password, salt);
  }
  if (userInfo.firstLogIn === 'true') {
    if (firstName && lastName && username && password && email) {
      userInfo.firstName = firstName;
      userInfo.lastName = lastName;
      userInfo.username = username;
      userInfo.password = hashedPassword;
      userInfo.email = email;
      userInfo.firstLogIn = 'false';
    } else {
      res.status(500);
      throw new Error('All fields must be filled upon first login');
    }
  }
  if (userInfo.userType == 'instructor') {
    userInfo.email = email || userInfo.email;
    userInfo.biography = biography || userInfo.biography;
    userInfo.password = password ? hashedPassword : userInfo.password;
    userInfo.username = username || userInfo.username;
  }
  await User.findByIdAndUpdate(userId, userInfo);
  res.status(200).json({ success: true, message: 'Details edited', statusCode: 200 });
});

const changePassword = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const { oldPassword, newPassword } = req.body;
  const userInfo = await User.findById(userId);
  if (bcrypt.compare(userInfo.password, oldPassword)) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
  } else {
    res.status(401);
    throw new Error('Old password does not match');
  }
  res
    .status(200)
    .json({ success: true, statusCode: 200, message: 'Password Updated Successfully' });
});

const addUser = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await User.create({
    username: req.body.username,
    password: hashedPassword,
    userType: req.body.type,
    firstLogIn: req.body.type === 'administrator' ? undefined : 'true',
    biography: req.body.type === 'instructor' ? '' : undefined,
    rating: req.body.type === 'instructor' ? { value: 0.0, numberOfRatings: 0 } : undefined,
    country: req.body.type !== 'administrator' ? { name: 'Egypt', code: 'EG' } : undefined,
    reset: req.body.type !== 'administrator' ? 'false' : undefined,
    wallet:
      req.body.type !== 'administrator' && req.body.type !== 'corporate trainee' ? 0 : undefined
  });
  res.status(200).json({ success: true, statusCode: 200, message: 'User added successfully' });
});

const rateInstructor = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { instructorId } = req.query;
  const { rating } = req.body;
  var newRating = 0;
  const ratedInstructor = await User.findById(instructorId);
  const check = await viewRating(userId, instructorId);
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
  res
    .status(200)
    .json({ success: true, statusCode: 200, message: 'Instructor Rated Successfully!' });
});

const resetPasswordSendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userInfo = await User.findOneAndUpdate({ email: email }, { reset: 'true' });
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const token = jwt.sign({ email }, process.env.RESET_SECRET, {
    expiresIn: '20m'
  });
  await User.findOneAndUpdate({ email: email }, { reset: 'true' });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: process.env.EMAIL_SUBJECT,
    text: `Hi ${userInfo.firstName},
    
    There was a request to change your password!
    
    If you did not make this request then please ignore this email.
    
    Otherwise, please click this link to change your password: http://localhost:3000/passwordReset?token=${token} `
  };
  transporter.sendMail(mailOptions, async function (err, data) {
    if (err) {
      await User.findOneAndUpdate({ email: email }, { reset: { initiated: 'false', token: '' } });
      console.log(err.message);
    } else {
      console.log('Email sent successfully');
      res.status(200).json({ statusCode: 200, success: true, message: 'success' });
    }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email } = res.locals;
  const { password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findOne({ email: email });
  if (user && user.reset === 'true') {
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword, reset: 'false' });
    console.log(user);
  } else {
    res.status(401);
    throw new Error('Token timed out!');
  }
  if (user) {
    res
      .status(200)
      .json({ statusCode: 200, success: true, message: 'Successfully reset password!' });
  } else {
    res.status(404);
    throw new Error('User was not found');
  }
});

const getCertificate = asyncHandler(async (req, res) => {
  const userId = res.locals('userId');
  const { courseId } = req.query;
  const { title, instructor } = await getCourseInfo(courseId);
  const instructorName = instructor.firstName + ' ' + instructor.lastName;
  const userInfo = await User.findById(userId, 'firstName lastName');
  const studentName = userInfo.firstName + ' ' + userInfo.lastName;
  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4'
  });
  fillCertificate(doc, instructorName, studentName, title);
  const filename = 'certificate.pdf';
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);
  doc.end();
});

const sendCertificateEmail = asyncHandler(async (userId, courseId) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const { title, instructor } = await getCourseInfo(courseId);
  const instructorName = instructor.firstName + ' ' + instructor.lastName;
  const userInfo = await User.findById(userId);
  const studentName = userInfo.firstName + ' ' + userInfo.lastName;
  const buffers = [];
  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4'
  });
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userInfo.email,
      subject: 'Course Completed!',
      text: `Hi ${userInfo.firstName},
    
      Congratulations on passing the course!
      
      Please find attached your certificate of completion.
      
      If you have any issues, please do not hesitate to contact us. `,
      attachments: [
        {
          filename: 'Certificate.pdf',
          content: pdfData
        }
      ]
    };
    return transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error('There was an error while sending the email:', error.message);
      });
  });
  fillCertificate(doc, instructorName, studentName, title);
  doc.end();
});

const requestRefund = async (req, res) => {
  const userId = res.locals.userId;
  const { courseId } = req.query;
  const record = await RegisteredCourses.findOne({ userId: userId, courseId: courseId }).populate();
  if (record.progress < 50) {
    await Request.create({ userId: userId, courseId: courseId, requestType: 'refund' });
    res
      .status(200)
      .json({ success: true, statusCode: 200, message: 'Request received Successfully!' });
  } else {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Student Attended More than 50% of Course!'
    });
  }
};

const requestCourseAccess = async (req, res) => {
  const userId = res.locals.userId;
  const { courseId } = req.query;
  await Request.create({ userId: userId, courseId: courseId, requestType: 'access' });
  res
    .status(200)
    .json({ success: true, statusCode: 200, message: 'Request Received Successfully!' });
};

const changeRefundStatus = async (req, res, next) => {
  const { requestId } = req.query;
  const { newStatus } = req.body;
  const request = await Request.findByIdAndDelete(requestId);
  if (newStatus === 'accepted') {
    res.locals.refundedUserId = request.userId;
    res.locals.courseId = request.courseId;
    next();
  } else {
    res
      .status(200)
      .json({ message: 'Status Updated successfully', success: true, statusCode: 200 });
  }
};

const changeAccessStatus = async (req, res, next) => {
  const { requestId } = req.query;
  const { newStatus } = req.body;
  const request = await Request.findByIdAndDelete(requestId);
  res.locals.courseId = request.courseId;
  if (newStatus === 'accepted') {
    next();
  } else {
    res
      .status(200)
      .json({ message: 'Status Updated successfully', success: true, statusCode: 200 });
  }
};

const getRequests = async (req, res) => {
  const { requestType } = req.query;
  const courseRequests = await Request.find({ requestType: requestType });
  res.status(200).json({
    message: 'Requests fetched successfully',
    success: true,
    payload: courseRequests,
    statusCode: 200
  });
};

module.exports = {
  signUp,
  login,
  logout,
  getCountry,
  changeCountry,
  getRate,
  addUser,
  editUser,
  changePassword,
  rateInstructor,
  resetPasswordSendEmail,
  resetPassword,
  getMe,
  viewInstructorDetails,
  getCertificate,
  sendCertificateEmail,
  requestRefund,
  requestCourseAccess,
  changeRefundStatus,
  changeAccessStatus,
  getCountryIso,
  getCorrectPrice,
  getRequests
};
