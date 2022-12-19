const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var registeredCoursesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  progress: {
    type: Number,
    default: 0.0,
    min: 0.0,
    max: 100.0
  },
  emailSent: {
    type: String,
    default: 'false'
  }
});

//Export the model
module.exports = mongoose.model('RegisteredCourses', registeredCoursesSchema);
