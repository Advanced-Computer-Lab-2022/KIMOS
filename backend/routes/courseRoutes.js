const express = require('express');
const router = express.Router();
const { findSubjects, findCourseMarsaf, rateCourse} = require('../controllers/courseController');
router.get('/subjects', findSubjects);
router.post('/findCourse', findCourseMarsaf);
router.post('/rateCourse', rateCourse);




module.exports = router;
