
const express = require('express');
const router = express.Router();

const {viewCourse,viewMyCourses} = require('../controllers/courseController')

const { findCourse, findSubjects, findCourseMarsaf } = require("../controllers/courseController");

router.get('/viewCourse/:id',viewCourse)

router.get('/viewMyCourses/:id',viewMyCourses) // view the courses given by me (as instructor) given my id as param, subject
                                                // and price in the req body.





router.get("/subjects", findSubjects);
router.post("/findCourse", findCourseMarsaf);


module.exports = router;

