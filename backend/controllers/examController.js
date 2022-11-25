const Exam = require('../models/examModel');

const { createExercise, setExerciseAnswer } = require('./exerciseController');

const getExam = async (examId, access) => {
  const exam = null;
  if (access) exam = await Exam.findById(examId).populate('exercises');
  else exam = await Exam.findById(examId).populate('exercises', '--answer');
  return exercise;
};

const createExam = async (exercises) => {
  const examArray = [];
  exercises.map(async (exercise, index) => {
    const { question, choices, answer } = exercise;
    const ex = await createExercise(question, choices, answer);
    exam.push(ex._id);
  });
  const exam = await Exam.create({
    exercises: examArray
  });

  return exam;
};

const setAnswer = async (examId, exerciseId, answer) => {
  const check = await Exam.findById(examId);
  if (check.exercises.includes(exerciseId)) {
    setExerciseAnswer(exerciseId, answer);
  } else {
    throw new Error('Exercise not in this exam');
  }
};

module.exports = {
  createExam,
  getExam,
  setAnswer
};
