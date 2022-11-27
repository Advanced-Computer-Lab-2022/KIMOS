const mongoose = require('mongoose');

const userSolutionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    examId: {
      type: mongoose.Types.ObjectId,
      ref: 'Exam'
    },
    solutions: [
      {
        exercise: {
          type: mongoose.Types.ObjectId,
          ref: 'Exercise'
        },
        choice: {
          type: Number
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserSolution', userSolutionSchema);
