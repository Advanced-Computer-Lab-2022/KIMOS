const Report = require('../models/reportModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const createReport = asyncHandler(async (req, res) => {
  const { courseId } = req.query;
  const { title, type, otherType, issue } = req.body;
  if (type === 'other' && !otherType) {
    res.status(500);
    throw new Error('Please specify the type of the issue');
  }
  await Report.create({
    course: courseId,
    user: res.locals.userId,
    title: title,
    type: type,
    issue: issue,
    otherType: type === 'other' ? otherType : undefined
  });
  res.status(200).json({ success: true, statusCode: 200, message: 'Report created successfully' });
});
const changeStatus = asyncHandler(async (req, res) => {
  const { reportId } = req.query;
  const { newStatus } = req.body;
  await Report.findByIdAndUpdate(reportId, { status: newStatus });
  res.status(200).json({ success: true, statusCode: 200, message: 'Status changed successfully' });
});
const addMessages = asyncHandler(async (req, res) => {
  const { reportId } = req.query;
  const { messages } = req.body;
  await Report.findByIdAndUpdate(reportId, { $push: { messages: { $each: messages } } });
  res
    .status(200)
    .json({ success: true, statusCode: 200, message: 'Messages uploaded successfully' });
});
const getReports = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const userInfo = await User.findById(userId);
  var reports = [];
  if (userInfo.userType === 'administrator') {
    reports = await Report.find();
  } else {
    reports = await Report.find({ user: userId });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Reports fetched successfully',
    payload: { reports }
  });
});

module.exports = {
  createReport,
  changeStatus,
  addMessages,
  getReports
};
