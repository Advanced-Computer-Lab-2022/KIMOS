const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reportSchema = new mongoose.Schema({
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['technical', 'financial', 'other'],
    required: true
  },
  otherType: {
    type: String
  },
  issue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unseen', 'pending', 'resolved'],
    default: 'unseen'
  },
  messages: {
    type: [
      {
        type: {
          message: {
            type: String,
            required: true
          },
          userType: {
            type: String,
            enum: ['administrator', 'individual trainee', 'corporate trainee', 'instructor'],
            required: true
          }
        }
      }
    ],
    default: []
  }
});

//Export the model
module.exports = mongoose.model('Report', reportSchema);
