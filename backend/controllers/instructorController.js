const { isObjectIdOrHexString } = require('mongoose');
const CourseData=require('../models/courseModel.js');

const instructorViewCourses=async(req,res)=>{
    try {
        const allCourses=await CourseData.find();
        let filteredCourses=allCourses.filter((item)=>(item.instructor=="635387b65b29f183de6e32d6"));           
        res.status(201).json(filteredCourses);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const instructorCreateCourse=async(req,res)=>{
    const course=req.body;

    const newCourse=await CourseData.create({
        title:course.title,
        subject:course.subject,
        subtitle:course.subtitle,
        totalHours:course.totalHours,
        price:course.price,
        summary:course.summary,
        instructor:course.instructor
    }); 

    // try {
    //     await newCourse.save();
    //     res.status(201).json(newCourse);
    // } catch (error) {
    //     res.status(409).json({message:error.message});
    // }
    
}

module.exports = {instructorViewCourses, instructorCreateCourse}
