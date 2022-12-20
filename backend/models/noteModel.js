const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: String
  },
  lastEdit: {
    type: String
  }
});

//Export the model
module.exports = mongoose.model('Note', noteSchema);
