const express = require('express');
const router = express.Router();
const {
  findSubjects,
  findCourses,
  viewCourse,
  createCourse,
  editCourse,
  findExam,
  getGradeAndSolution,
  submitSolution,
  rateCourse,
  addExam,
  modifyExam
} = require('../controllers/courseController');

router.get('/subjects', findSubjects);
router.get('/findCourses', findCourses);
router.route('/').get(viewCourse).post(createCourse).put(editCourse);
router.route('/rate').post(rateCourse);
router.route('/exam').get(findExam).post(addExam).put(modifyExam);
router.route('/exam/solution').post(submitSolution).get(getGradeAndSolution);
module.exports = router;
