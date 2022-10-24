const mongoose = require('mongoose')
const Course = require('../models/courseModel')

const viewCourse = async (req,res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return  res.status(404).json({error:"Invalid id"})
    }

    course = await Course.findById(req.params.id)

    if(!course){
        return res.status(404).json({error:'No such course'})
    }

    res.status(200).json(course)
    
}

const viewMyCourses = async (req,res) => { // based on instructors id given as parameter , subject and price given in the req's body
  const id = req.params.id
  const subject = req.query.subject
  const price = req.query.price
  console.log(price)
  console.log(subject)
  if(!mongoose.Types.ObjectId.isValid(id)){
    return  res.status(404).json({error:"Invalid id"})
  }

  if(price!=-1 && subject!='undefined'){
    courses = await Course.find({$and: [{instructor:id},{$or:[{subject:subject},{price:price}]}]})
  }else if (subject!='undefined'){
    courses = await Course.find({$and: [{instructor:id},{subject:subject}]})
  }else if (price!=-1){
    courses = await Course.find({$and: [{instructor:id},{price:price}]})
  }else {
    courses = await Course.find({instructor:id})
  }

  //courses = await Course.find({instructors:id})
 // console.log(courses)

  if(!courses){
      return res.status(200).json({error:'No courses'})
  }

  res.status(200).json(courses)
  
}

module.exports = {viewCourse,viewMyCourses}