const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  question: {
    type: String
  },
  choices: [
    {
      type: String
    },
    { validate: [choiceSize, 'Must have 4 choices per question'] }
  ],
  //1,2,3,4 for the choice of the correct answer
  answer: {
    type: Number //can only be accessed and set by the course instructor
  }
});

function choiceSize(val) {
  return val.length == 4;
}
module.exports = mongoose.model('Exercise', exerciseSchema);
