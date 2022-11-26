const express = require('express');
const router = express.Router();
const {
  findSubjects,
  findCourses,
  viewCourse,
  createCourse,
  editCourse,
  findExam,
  addExam,
  modifyExam
} = require('../controllers/courseController');

router.get('/subjects', findSubjects);
router.get('/findCourses', findCourses);

router.route('/exam').get(findExam).post(addExam).put(modifyExam);

router.route('/').get(viewCourse).post(createCourse).put(editCourse);

module.exports = router;
