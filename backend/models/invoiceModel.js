const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Specify the userId']
  },
  instructorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Specify the userId']
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please Specify the courseId']
  },
  payment: {
    type: Number,
    required: [true, 'Please Specify the payment']
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
