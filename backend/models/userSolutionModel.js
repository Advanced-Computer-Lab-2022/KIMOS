const mongoose = require('mongoose');

const userSolutionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please Specify student userId']
    },
    examId: {
      type: mongoose.Types.ObjectId,
      ref: 'Exam',
      required: [true, 'Please Specify examId']
    },
    grade: {
      type: String,
      required: [true, 'Please Specify grade']
    },
    solutions: {
      type: [
        {
          exercise: {
            type: mongoose.Types.ObjectId,
            ref: 'Exercise'
          },
          choice: {
            type: Number
          }
        }
      ],
      required: [true, 'All Questions must be answered']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserSolution', userSolutionSchema);
