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
  const answer = await UserSolution.create({
    userId: userId,
    examId: examId,
    solutions: solutions,
    grade: await calcGrade(solutions)
  });
  return answer;
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
  var correctAnswers = 0;
  const promises = solutions.map(async (solution, index) => {
    const exercise = await getExercise(solution.exercise);
    if (solution.choice === exercise.answer) {
      return 1;
    } else {
      return 0;
    }
  });
  const answers = await Promise.all(promises);
  //console.log(answers);
  const grade = answers.reduce((a, b) => a + b, 0) + '/' + solutions.length;
  return grade;
};

module.exports = {
  createSolution,
  editSolution,
  getSolution
};
