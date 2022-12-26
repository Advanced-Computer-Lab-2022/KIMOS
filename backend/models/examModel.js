const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title for the exam']
    },
    exercises: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Exercise'
        }
      ],
      validate: [exerciseSize, 'Must have at least one exercise']
    }
  },
  {
    timestamps: true
  }
);
function exerciseSize(val) {
  return val.length >= 1;
}

module.exports = mongoose.model('Exam', examSchema);
