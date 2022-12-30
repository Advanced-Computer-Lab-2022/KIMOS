const mongoose = require('mongoose');

const subtitleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    hours: {
      type: Number,
      default: 0
    },
    quizzes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exam'
        }
      ]
    },
    videos: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Video'
        }
      ],
      validate: [arraySize, 'Must have at least one video']
    }
  },
  {
    timestamps: true
  }
);

function arraySize(val) {
  return val.length >= 1;
}
module.exports = mongoose.model('Subtitle', subtitleSchema);
