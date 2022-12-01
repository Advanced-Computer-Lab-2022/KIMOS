const Exercise = require('../models/exerciseModel');

const createExercise = async (exercise) => {
  const { question, c1, c2, c3, c4, answer } = exercise;
  const ex = Exercise.create({
    question: question,
    choices: [c1, c2, c3, c4],
    answer: answer
  });
  return ex;
};

const editExercise = async (exerciseId, newExercise) => {
  const exercise = Exercise.findByIdAndUpdate(exerciseId, newExercise);
  return exercise;
};

const getExercise = async (exerciseId) => {
  const exercise = Exercise.findById(exerciseId);
  return exercise;
};

module.exports = {
  createExercise,
  editExercise,
  getExercise
};
