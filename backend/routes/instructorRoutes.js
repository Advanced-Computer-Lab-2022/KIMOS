const express = require('express');
const instructorViewCourses=require('../controllers/instructorController.js');
const instructorCreateCourse=require('../controllers/instructorController.js');


const router=express.Router();

router.get('/',instructorViewCourses);
router.post('/',instructorCreateCourse);


module.exports=router;