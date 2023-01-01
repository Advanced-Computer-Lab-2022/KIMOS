const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const RegisteredCourse = require('../models/registeredCoursesModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');

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
        res.locals.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'You are not logged in.' });
  }
};

const instructorAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.userId);
  if (user.userType === 'instructor') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

const adminAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.userId);
  if (user.userType === 'administrator') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

const individualAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.userId);
  if (user.userType === 'individual trainee') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

const corporateAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.userId);
  if (user.userType === 'corporate trainee') {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

const isRegisteredWithInstructor = asyncHandler(async (req, res, next) => {
  const registeredCourses = await RegisteredCourse.find({ userId: res.locals.userId });
  const instructorId = req.query.instructorId.toString();
  const check = await Promise.all(
    registeredCourses.map(async (registeredCourse, index) => {
      const course = await registeredCourse.populate('courseId');
      if (instructorId === course.courseId.instructor.toString()) {
        return false;
      } else {
        return true;
      }
    })
  );
  const flag = check.reduce((a, b) => a && b, true);
  if (!flag) {
    next();
  }
  if (flag) {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

const resetPasswordAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  jwt.verify(token, process.env.RESET_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'Unauthorized access',
        stack: err.stack
      });
    } else {
      res.locals.email = decodedToken.email;
      next();
    }
  });
});

const registerCourseAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.query;

  jwt.verify(token, process.env.PAYMENT_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'Unauthorized access',
        stack: err.stack
      });
    } else {
      if (res.locals.userId.toString() === decodedToken.userId.toString()) {
        res.locals.courseId = decodedToken.courseId;
        next();
      } else {
        res.status(401).json({
          statusCode: 401,
          success: false,
          message: 'Unauthorized access'
        });
      }
    }
  });
});

const registeredCourseAuth = asyncHandler(async (req, res, next) => {
  const registration = await RegisteredCourse.findOne({
    userId: res.locals.userId,
    courseId: req.query.courseId
  });
  if (registration) {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

const editCourseAuth = asyncHandler(async (req, res, next) => {
  const userId = res.locals.userId.toString();
  const courseInfo = await Course.findById(req.query.courseId);
  if (courseInfo.visibility !== 'private') {
    res
      .status(401)
      .json({ statusCode: 401, success: false, message: 'Cannot edit public courses' });
  } else {
    if (userId === courseInfo.instructor.toString()) {
      next();
    } else {
      res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
    }
  }
});

const seePublicCourseAuth = asyncHandler(async (req, res, next) => {
  const courseInfo = await Course.findById(req.query.courseId);
  if (courseInfo.visibility === 'public') {
    next();
  }
  else if (courseInfo.visibility === 'private') {
    res.status(401).json({
      statusCode: 401,
      success: false,
      message: 'Cannot access courses that are not public'
    });
  } else {
    if (courseInfo.visibility === 'closed' ) {
      const registration = await RegisteredCourse.findOne({
        userId: res.locals.userId,
        courseId: req.query.courseId
      });
      if (registration) {
        next();
      } else {
        res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
      }
    }

  }
});

const editPublicCourseAuth = asyncHandler(async (req, res, next) => {
  const userId = res.locals.userId.toString();
  const courseInfo = await Course.findById(req.query.courseId);
  if (userId === courseInfo.instructor.toString()) {
    next();
  } else {
    res.status(401).json({ statusCode: 401, success: false, message: 'Unauthorized access' });
  }
});

module.exports = {
  loggedIn,
  adminAuth,
  instructorAuth,
  registerCourseAuth,
  resetPasswordAuth,
  isRegisteredWithInstructor,
  registeredCourseAuth,
  editPublicCourseAuth,
  editCourseAuth,
  individualAuth,
  corporateAuth,
  seePublicCourseAuth
};
