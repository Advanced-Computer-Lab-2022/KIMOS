const { random } = require('colors');
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Please choose a title for the course']
    },
    price: {
      type: Number,
      required: [true, 'Please specify a price for the course'],
      min: 0.0
    },
    rating: {
      type: Number,
      default: Math.floor(Math.random() * 6),
      min: 0.0,
      max: 5.0
    },
    totalHours: {
      type: Number,
      //required: [true, 'Please specify the total number of hours for the course'],
      min: 0.0
    },
    discount: {
      amount: {
        type: Number,
        min: 0.0,
        max: 100.0,
        default: 0.0
      },
      duration: {
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        }
      }
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
    preview: {
      type: String
    },
    subtitles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtitle'
      }
    ],
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Course', courseSchema);
