const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Exam Title'
    },
    exercises: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Exercise'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Exam', examSchema);
