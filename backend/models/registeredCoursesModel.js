const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var registeredCoursesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0.0
  }
});

//Export the model
module.exports = mongoose.model('RegisteredCourses', registeredCoursesSchema);
