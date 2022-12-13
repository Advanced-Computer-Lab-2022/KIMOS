const { next } = require('cli');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const registerUser = require('../models/registeredCoursesModel');
const schedule = require('node-schedule');

const loggedIn = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          statusCode: 401,
          success: false,
          message: 'You are not logged in.',
          stack: err.stack
        });
      } else {
        res.locals({ userId: decodedToken.id });
        next();
      }
    });
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'You are not logged in.' });
  }
};

const isRegisteredToCourse = async (req, res) => {
  const registration = await registerUser.findOne({
    userId: res.locals('userId'),
    courseId: req.query.courseId
  });
  if (registration) {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
};

const isInstructor = async (req, res) => {
  const userType = await User.findById(res.locals('userId')).userType;
  if (userType === 'instructor') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
};

const isAdmin = async (req, res) => {
  const userType = await User.findById(res.locals('userId')).userType;
  if (userType === 'administrator') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
};

const isCorporateTrainee = async (req, res) => {
  const userType = await User.findById(res.locals('userId')).userType;
  if (userType === 'corporate trainee') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
};

const isRegisteredWithInstructor = async (req, res) => {
  const registeredCourses = await registerUser.find({ userId: res.locals('userId') });
  var flag = false;
  registeredCourses.map(async (registeredCourse, index) => {
    const course = await registeredCourse.populate('courseId');
    if (course.courseId.instructor.equals(req.query.instructorId)) {
      flag = true;
      next();
    }
  });
  if (!flag) {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
};

const resetPasswordAuth = async (req, res) => {
  const { token, email } = req.query;
  const checkToken = User.findOne({ email: email, reset: { initiated: true, token: token } });
  if (checkToken) {
    await User.findOneAndUpdate({ email: email }, { reset: { initiated: 'false', token: '' } });
    const job = schedule.scheduledJobs(email + 'reset');
    if (job) job.cancel();
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
};

module.exports = {
  loggedIn,
  isAdmin,
  isCorporateTrainee,
  isInstructor,
  isRegisteredToCourse,
  resetPasswordAuth,
  isRegisteredWithInstructor
};
