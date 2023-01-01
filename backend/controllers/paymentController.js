const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const RegisteredCourse = require('../models/registeredCoursesModel');
const jwt = require('jsonwebtoken');
const { getCountryIso, getCorrectPrice } = require('./userController');
const asyncHandler = require('express-async-handler');
const RegisteredCourse = require('../models/registeredCoursesModel');

const checkout = asyncHandler(async (req, res) => {
  const registration = await RegisteredCourse.find({
    userId: res.locals.userId,
    courseId: req.query.courseId
  });
  if (registration) {
    res.status(500);
    throw new Error('Course already registered');
  }
  const userInfo = await User.findById(res.locals.userId);
  const currency = getCountryIso(userInfo.country.code);
  const courseInfo = await Course.findById(req.query.courseId);
  const token = jwt.sign(
    { userId: res.locals.userId, courseId: req.query.courseId },
    process.env.PAYMENT_SECRET
  );
  const rate = await getCorrectPrice(currency);
  var coupon;
  if (courseInfo.discount.amount > 0) {
    coupon = await stripe.coupons.create({
      percent_off: courseInfo.discount.amount,
      duration: 'once'
    });
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    invoice_creation: { enabled: true },
    discounts: [
      {
        coupon: coupon ? coupon.id : undefined
      }
    ],
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: courseInfo.title
          },
          unit_amount: parseInt(courseInfo.price * rate * 100)
        },
        quantity: 1
      }
    ],
    success_url: `http://localhost:3000/paymentLoading?token=${token}`,
    cancel_url: `http://localhost:3000/paymentCancelled`
  });
  res.status(200).json({
    payload: { url: session.url, token: token },
    success: true,
    message: 'Details edited',
    statusCode: 200
  });
});

module.exports = {
  checkout
};
