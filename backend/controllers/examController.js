const Exam = require('../models/examModel');

const { createExercise, editExercise } = require('./exerciseController');

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
const editExam = async (examId, exercises) => {
  const ex = Exam.findById(examId);
  ex.exercises.map(async (exercise, index) => {
    if (exercise._id) {
      editExercise(exercise._id, exercise);
    } else {
      createExercise(exercise);
      Exam.findByIdAndUpdate(examId, { $push: { exercises: exercise._id } });
    }
  });
};

module.exports = {
  createExam,
  getExam,
  editExam
};
