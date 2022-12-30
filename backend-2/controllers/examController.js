const Exam = require('../models/examModel');
const mongoose = require('mongoose');

const { createExercise, editExercise, deleteExercise } = require('./exerciseController');

const getExam = async (examId, access) => {
  var exam = null;
  if (access) exam = await Exam.findById(examId).populate('exercises');
  else exam = await Exam.findById(examId).populate('exercises', '-answer');
  return exam;
};

const createExam = async (exam) => {
  const { title, exercises } = exam;
  const promises = exercises.map(async (exercise, index) => {
    const ex = await createExercise(exercise).catch((err) => {
      throw err;
    });
    return ex;
  });
  const examArray = await Promise.all(promises);
  const ex = await Exam.create({
    title: title,
    exercises: examArray
  });
  return ex;
};
const editExam = async (examId, exam) => {
  const { title, exercises } = exam;
  const oldExam = await Exam.findById(examId);
  let exercisesIds = exercises.map((exercise) => {
    const exerciseId = exercise._id;
    if (exerciseId) {
      return exerciseId.toString();
    }
    return '-1';
  });
  oldExam.exercises.map(async (exerciseId, index) => {
    if (!exercisesIds.includes(exerciseId.toString())) {
      await deleteExercise(exerciseId).catch((err) => {
        throw err;
      });
    }
  });
  const exs = await Promise.all(
    exercises.map(async (newExercise, index) => {
      var ex;
      if (newExercise._id) {
        ex = await editExercise(newExercise._id, newExercise).catch((err) => {
          throw err;
        });
      } else {
        ex = await createExercise(newExercise).catch((err) => {
          throw err;
        });
      }
      return ex._id;
    })
  );
  await Exam.findByIdAndUpdate(examId, { title: title, exercises: exs });
};

const deleteExam = async (examId) => {
  const exam = await Exam.findByIdAndDelete(examId);
  exam.exercises.map(async (exercise, index) => {
    await deleteExercise(exercise._id).catch((err) => {
      throw err;
    });
  });
};

module.exports = {
  createExam,
  getExam,
  editExam,
  deleteExam
};
