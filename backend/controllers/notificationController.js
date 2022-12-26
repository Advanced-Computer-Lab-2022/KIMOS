const Notification = require('../models/notificationModel');
const asyncHandler = require('express-async-handler');
const getUnseenNotifications = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const notifications = await Notification.find({ userId: userId, status: 'unseen' });
  const update = await Notification.updateMany({ userId: userId }, { status: 'seen' });
  res.status(200).json({
    message: 'Notifications fetched successfully',
    success: true,
    statusCode: 200,
    payload: notifications
  });
});
const addNotification = async (userId, message) => {
  const notification = await Notification.create({
    userId: userId,
    message: message
  });
  return notification;
};
module.exports = { addNotification, getUnseenNotifications };
