const express = require('express');
const router = express.Router();
const { findSubjects, findCourseMarsaf } = require('../controllers/courseController');
router.get('/subjects', findSubjects);
router.post('/findCourse', findCourseMarsaf);

module.exports = router;
