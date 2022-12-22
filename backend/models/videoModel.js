const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var videoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, 'Insert video link']
  },
  hours: {
    type: Number,
    required: [true, 'Specify number of hours']
  },
  description: {
    type: String
  }
});

//Export the model
module.exports = mongoose.model('Video', videoSchema);
