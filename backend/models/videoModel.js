const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var videoSchema = new mongoose.Schema({
  link: {
    type: String,
    default:""
  },
  hours: {
    type: Number,
    default:0

  },
  description: {
    type: String,
    default:"N/A"
  }
});

//Export the model
module.exports = mongoose.model('Video', videoSchema);
