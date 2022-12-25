const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Specify the userId']
  },
  ratedId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please Specify the rated object id']
  },
  rating: {
    type: Number,
    required: [true, 'Please Specify the rating']
  },
  review:{
    type: String,
    default:""
  }
});

module.exports = mongoose.model('Rating', ratingSchema);
