const Invoice = require('../models/invoiceModel');
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');

const createInvoice = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const courseId = res.locals.courseId;
  const courseInfo = await Course.findById(courseId);
  await Invoice.create({
    userId: userId,
    instructorId: courseInfo.instructorId,
    courseId: courseId,
    payment: courseInfo.price - courseInfo.price * (courseInfo.discount.amount / 100)
  });
  res.status(200).json({ success: true, statusCode: 200, message: 'Invoice created successfully' });
});
const refundInvoice = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { instructorId } = req.query;
  const { payment } = req.body;
  await Invoice.create({ userId: userId, instructorId: instructorId, payment: payment * -1 });
  await User.findByIdAndUpdate(userId, { $inc: { wallet: payment } });
  res
    .status(200)
    .json({ success: true, statusCode: 200, message: 'Invoice refunded successfully' });
});

const getAllInvoices = asyncHandler(async (req, res) => {
  const { instructorId } = req.query;
  const invoices = await Invoice.aggregate([
    { $match: { instructorId: instructorId } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          course: '$courseId'
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {}
    }
  ]);

  res.status(200).json({
    payload: invoices,
    success: true,
    statusCode: 200,
    message: 'Invoices sent Successfully!'
  });
});
module.exports = {
  createInvoice,
  refundInvoice,
  getAllInvoices
};
