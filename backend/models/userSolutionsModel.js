const mongoose = require('mongoose');

const userSolutionsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    examId:{
      type: mongoose.Types.ObjectId,
      ref: 'Exam'
    },
    userSolutions: [
        {
          exercise:{
            type: mongoose.Types.ObjectId,
            ref: 'Exercise'
          },
          answer:{
            type: Number
          }
        }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserSolutions', userSolutionsSchema);
