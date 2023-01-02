const mongoose = require('mongoose');

const subtitleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: ""

    },
    hours: {
      type: Number,
      default: 0
    },
    quizzes: {
      default:[],
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exam'
        }
      ]
    },
    videos: {
      default:[],
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Video'
        }
      ],

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
