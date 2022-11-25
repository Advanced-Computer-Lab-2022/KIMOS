const Exercise = require('../models/exerciseModel');

const createExercise = async (question, choices, answer) => {
  const exercise = Exercise.create({
    question: question,
    choices: choices,
    answer: answer
  });
  return exercise;
};

const setExerciseAnswer = async (exerciseId, answer) => {
  const exercise = Exercise.findByIdAndUpdate(exerciseId, {
    answer: answer
  });
  return exercise;
};

module.exports = {
  createExercise,
  setExerciseAnswer
};
