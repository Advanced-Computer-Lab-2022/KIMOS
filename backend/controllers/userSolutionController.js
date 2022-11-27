const UserSolution = require('../models/userSolutionModel');

const getSolution = async (userId, examId) => {
  const answer = await UserSolution.findOne({ userId: userId, examId: examId });
  return answer;
};
const createSolution = async (userId, examId, solutions) => {
  const answer = await UserSolution.create({
    userId: userId,
    examId: examId,
    solutions: solutions
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
      solutions: solutions
    },
    { new: true }
  );
  return answer;
};

module.exports = {
  createSolution,
  editSolution,
  getSolution
};
