const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Specify student userId']
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please Specify course courseId']
  },
  requestType: {
    type: String,
    enum: ['refund', 'access'],
    required: [true, 'Specify type of request']
  }
});
//Export the model
module.exports = mongoose.model('Request', requestSchema);
