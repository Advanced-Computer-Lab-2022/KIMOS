const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Give the video a title']
  },
  link: {
    type: String,
    required: [true, 'Insert video link']
  },
  description: {
    type: String
  }
});

//Export the model
module.exports = mongoose.model('Video', videoSchema);
