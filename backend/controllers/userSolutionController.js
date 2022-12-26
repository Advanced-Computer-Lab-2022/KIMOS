const UserSolution = require('../models/userSolutionModel');
const { mongoose } = require('mongoose');
const { getExercise } = require('./exerciseController');

const getSolution = async (userId, examId) => {
  const answer = await UserSolution.findOne({ userId: userId, examId: examId }).populate(
    'solutions'
  );
  return answer;
};
const createSolution = async (userId, examId, solutions) => {
  const grade = await calcGrade(solutions);
  const answer = await UserSolution.create({
    userId: userId,
    examId: examId,
    solutions: solutions,
    grade: grade
  });
  return grade;
};

const deleteSolution = async (userId, examId) => {
  const sol = UserSolution.findOneAndDelete({ userId: userId, examId: examId });
  return sol;
};

const editSolution = async (userId, examId, solutions) => {
  const answer = await UserSolution.findOneAndUpdate(
    {
      userId: userId,
      examId: examId
    },
    {
      solutions: solutions,
      grade: await calcGrade(solutions)
    },
    { new: true }
  );
  return answer;
};

const calcGrade = async (solutions) => {
  const promises = solutions.map(async (solution, index) => {
    const exercise = await getExercise(solution.exercise);
    if (parseInt(solution.choice) === parseInt(exercise.answer)) {
      return 1;
    } else {
      return 0;
    }
  });
  const answers = await Promise.all(promises);
  const grade = answers.reduce((a, b) => a + b, 0) + '/' + solutions.length;
  //console.log(grade);
  return grade;
};

module.exports = {
  createSolution,
  editSolution,
  getSolution,
  deleteSolution
};
