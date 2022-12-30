const { random } = require('colors');
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    visibility: {
      type: String,
      enum: ['public', 'private', 'closed'],
      lowercase: true,
      default: 'private'
    },
    title: {
      type: String,
      unique: true,
      required: [true, 'Please choose a title for the course']
    },
    summary: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Please specify a price for the course'],
      min: 0.0
    },
    rating: {
      type: {
        value: {
          type: Number,
          default: 0,
          min: 0.0,
          max: 5.0
        },
        numberOfRatings: {
          type: Number,
          default: 0
        }
      },
      default: {
        value: 0.0,
        numberOfRatings: 0
      }
    },
    totalHours: {
      type: Number,
      required: [true, 'Specify total hours'],
      min: 0.0
    },
    discount: {
      type: {
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
      default: {
        amount: 0.0,
        duration: {}
      }
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Please specify a subject for the course']
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please specify an instructor'],
      ref: 'User'
    },
    preview: {
      type: String,
      default: ''
    },
    subtitles: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subtitle'
        }
      ],
      default: []
    },
    exams: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exam'
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Course', courseSchema);
