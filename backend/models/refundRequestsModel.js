const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var refundRequestsSchema = new mongoose.Schema({
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
});
//Export the model
module.exports = mongoose.model('RefundRequests', refundRequestsSchema);