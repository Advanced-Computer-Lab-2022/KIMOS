const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
  {
    title: {
      type: String
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
