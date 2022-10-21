const CourseData=require('../models/courseModel.js');

const instructorViewCourses=async(req,res)=>{
    try {
        const allCourses=await CourseData.find().toArray();
        console.log(allCourses);
        return {data:allCourses};
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const instructorCreateCourse=async(req,res)=>{
    const course=req.body;

    const newCourse=new CourseData(course);
    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
    
}

module.exports=instructorViewCourses;
module.exports=instructorCreateCourse;
