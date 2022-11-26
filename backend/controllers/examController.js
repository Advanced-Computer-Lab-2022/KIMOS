const Exam = require('../models/examModel');

const { createExercise, editExercise } = require('./exerciseController');

const getExam = async (examId, access) => {
  const exam = null;
  if (access) exam = await Exam.findById(examId).populate('exercises');
  else exam = await Exam.findById(examId).populate('exercises', '--answer');
  return exercise;
};

const createExam = async (exercises) => {
  const promises = exercises.map(async (exercise, index) => {
    const ex = await createExercise(exercise);
    return ex;
  });
  const examArray = await Promise.all(promises);
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
