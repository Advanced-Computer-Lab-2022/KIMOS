const Exercise = require('../models/exerciseModel');
const getExercise = async (question, access) => {
  const exercise = null;
  if (access == true) exercise = await Exercise.findOne({ question: question });
  else exercise = await Exercise.findOne({ question: question }).select('--answer');
  return exercise;
};

const createExercise = async (exercise) => {
  const { question, choices, answer } = exercise;
  const ex = await Exercise.create({
    question: question,
    choices: choices,
    answer: answer || -1
  });
  return ex;
};

const setAnswer = async (question, answer) => {
  const ex = Exercise.findOneAndUpdate({ question: question }, { answer: answer });
  return ex;
};
module.exports = {
  createExercise,
  getExercise,
  setAnswer
};
