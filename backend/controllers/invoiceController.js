const Invoice = require('../models/invoiceModel');
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const createInvoice = asyncHandler(async (req, res, next) => {
  const userId = res.locals.userId;
  const courseId = res.locals.courseId;
  const courseInfo = await Course.findById(courseId);
  const inv = await Invoice.create({
    userId: userId,
    instructorId: courseInfo.instructor,
    courseId: courseId,
    payment: courseInfo.price - courseInfo.price * (courseInfo.discount.amount / 100)
  });
  res.locals.invoiceId = inv._id;
  next();
});
const refundInvoice = asyncHandler(async (req, res) => {
  const userId = res.locals.refundedUserId;
  const courseId = res.locals.courseId;
  const courseInfo = await Course.findById(courseId);
  const oldInvoice = await Invoice.findById(res.locals.invoiceId);
  await addNotification(
    userId,
    `Your request to refund course ${courseInfo.title} has been accepted and the amount has been added to your wallet.`
  );
  await Invoice.create({
    userId: userId,
    courseId: courseId,
    instructorId: courseInfo.instructor,
    payment: oldInvoice.payment * -1
  });
  await User.findByIdAndUpdate(userId, { $inc: { wallet: oldInvoice.payment } });
  res.status(200).json({ message: 'Successfully refunded course', statusCode: 200, success: true });
});

const getAllInvoicesInstructor = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const invoices = await Invoice.aggregate([
    { $match: { instructorId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          course: '$courseId',
          cost: '$payment'
        },

        count: { $sum: 1 }
      }
    }
  ]);
  const inv = await Course.populate(invoices, '_id.course');
  const returnResults = await Promise.all(
    inv.map(async (invoice, index) => {
      return {
        date: invoice._id.date,
        course: invoice._id.course.title,
        amount: invoice.count,
        itemPrice: invoice._id.cost
      };
    })
  );
  res.status(200).json({
    payload: returnResults,
    success: true,
    statusCode: 200,
    message: 'Invoices sent Successfully!'
  });
});

const getAllInvoicesUser = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const invoices = await Invoice.find;
});
module.exports = {
  createInvoice,
  refundInvoice,
  getAllInvoicesInstructor,
  getAllInvoicesUser
};
