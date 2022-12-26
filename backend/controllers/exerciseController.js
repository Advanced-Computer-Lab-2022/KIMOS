const Exercise = require('../models/exerciseModel');

const createExercise = async (exercise) => {
  const { question, c1, c2, c3, c4, answer } = exercise;
  const ex = await Exercise.create({
    question: question,
    choices: [c1, c2, c3, c4],
    answer: answer
  });
  return ex;
};

const editExercise = async (exerciseId, newExercise) => {
  const exercise = await Exercise.findByIdAndUpdate(exerciseId, newExercise);
  return exercise;
};

const getExercise = async (exerciseId) => {
  const exercise = await Exercise.findById(exerciseId);
  return exercise;
};

const deleteExercise = async (exerciseId) => {
  await Exercise.findByIdAndDelete(exerciseId);
};

module.exports = {
  createExercise,
  editExercise,
  getExercise,
  deleteExercise
};
