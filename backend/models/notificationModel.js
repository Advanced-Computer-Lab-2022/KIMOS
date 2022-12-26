const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: 'String',
    enum: ['seen', 'unseen'],
    default: 'unseen'
  }
});

//Export the model
module.exports = mongoose.model('Notification', notificationSchema);
