const express = require('express');
const {instructorCreateCourse,instructorViewCourses}=require('../controllers/instructorController.js');


const router=express.Router();

router.get('/',instructorViewCourses);
router.post('/',instructorCreateCourse);


module.exports=router;