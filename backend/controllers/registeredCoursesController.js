const RegisteredCourses = require('../models/registeredCoursesModel');

const registerUser = async (req, res) => {
  const { courseId, userId } = req.query;
  const registration = await RegisteredCourses.create({
    userId: userId,
    courseId: courseId
  });
  res.status(200).json({});
};

// const editExercise = async (exerciseId, newExercise) => {
//   const exercise = await Exercise.findByIdAndUpdate(exerciseId, newExercise);
//   return exercise;
// };

// const getExercise = async (exerciseId) => {
//   const exercise = await Exercise.findById(exerciseId);
//   return exercise;
// };

// const deleteExercise = async (exerciseId) => {
//   await Exercise.findByIdAndDelete(exerciseId);
// };

module.exports = {
  registerUser
};
