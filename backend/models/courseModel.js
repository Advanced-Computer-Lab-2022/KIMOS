const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please choose a title for the course']
    },
    price: {
      type: Number,
      required: [true, 'Please specify a price for the course'],
      min: 0.0
    },
    rating: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 5.0
    },
    totalHours: {
      type: Number,
      required: [true, 'Please specify the total number of hours for the course'],
      min: 0.0
    },
    discount: {
      type: Number,
      min: 0.0,
      max: 100.0,
      default: 0.0
    },
    subject: {
      type: String,
      required: [true, 'Please specify a subject for the course']
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify an instructor'],
      ref: 'User'
    },
    subtitles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course'
    },
    exercises: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Exercise'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
