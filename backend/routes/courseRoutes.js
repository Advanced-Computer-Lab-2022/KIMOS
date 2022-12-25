const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllRegisteredCourses,
  getAllNotes,
  updateNotes
} = require('../controllers/registeredCoursesController');
const {
  getAllSubjects,
  addNewSubject,
  findCourses,
  createCourse,
  editCourse,
  findExam,
  getExamSolution,
  submitSolution,
  rateCourse,
  addExam,
  viewCourseTrainee,
  removeExam,
  modifyExam
} = require('../controllers/courseController');
const {getAllRatings} = require('../controllers/ratingController');
const { addQuiz, editQuiz, deleteQuiz } = require('../controllers/subtitleController');
const { isRegisteredToCourse, isCorporateTrainee, isLoggedIn } = require('../middleware/helper');
const {
  editCourseAuth,
  instructorAuth,
  registeredCourseAuth,
  adminAuth,
  loggedIn
} = require('../middleware/auth');

router.route('/subjects').get(getAllSubjects).post(loggedIn, adminAuth, addNewSubject); //all good
router
  .route('/')
  .get(isLoggedIn, isCorporateTrainee, findCourses) //all good
  .post(loggedIn, instructorAuth, createCourse) //all good
  .put(loggedIn, editCourseAuth, editCourse); //all good
router.route('/rate').post(loggedIn, registeredCourseAuth, rateCourse)  //all good
  .get(loggedIn,getAllRatings);
router
  .route('/exam')
  .get(loggedIn, findExam) //all good
  .post(loggedIn, editCourseAuth, addExam) //all good
  .put(loggedIn, editCourseAuth, modifyExam) //all good
  .delete(loggedIn, editCourseAuth, removeExam); //all good
router
  .route('/subtitle/quiz')
  .post(loggedIn, editCourseAuth, addQuiz) //all good
  .put(loggedIn, editCourseAuth, editQuiz) //all good
  .delete(loggedIn, editCourseAuth, deleteQuiz); //all good
router
  .route('/exam/solution')
  .post(loggedIn, registeredCourseAuth, submitSolution) //all good
  .get(loggedIn, getExamSolution); //all good

router
  .route('/getMyCourse')
  .get(loggedIn, isRegisteredToCourse, isCorporateTrainee, viewCourseTrainee);
router.route('/register').post(loggedIn, registerUser).get(loggedIn, getAllRegisteredCourses); //all good

router
  .route('/notes')
  .get(loggedIn, registeredCourseAuth, getAllNotes) //all good
  .post(loggedIn, registeredCourseAuth, updateNotes); //all good
module.exports = router;
