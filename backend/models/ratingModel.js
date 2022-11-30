const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  ratedId: {
    type: mongoose.Types.ObjectId,
  },
  rating: {
      type: Number
  }
});

module.exports = mongoose.model('Rating', ratingSchema);
