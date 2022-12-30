const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const registerUser = require('../models/registeredCoursesModel');
const asyncHandler = require('express-async-handler');


const isRegisteredToCourse = asyncHandler(async (req, res,next) => {

  if (!res.locals.userId) {
    res.locals.registered = false;
    next();
  }
  const registration = await registerUser.findOne({
    userId: res.locals.userId,
    courseId: req.query.courseId
  });
  if (registration) {
    res.locals.registered = true;
    next();
  } else {
    res.locals.registered = false;
    next();
  }
});

const isCorporateTrainee = asyncHandler(async (req, res, next) => {
  if (!res.locals.userId) {
    res.locals.registered = false;
    next();
  } else {
    const user = await User.findById(res.locals.userId);
    const userType = user.userType;
    if (userType === 'corporate trainee') {
      res.locals.corporate = true;
    } else {
      res.locals.corporate = false;
    }
    next();
  }
});

const isLoggedIn = asyncHandler((req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (!err) {
        res.locals.userId = decodedToken.id;
      }
    });
  }
  next();
});
module.exports = {
  isLoggedIn,
  isCorporateTrainee,
  isRegisteredToCourse
};
