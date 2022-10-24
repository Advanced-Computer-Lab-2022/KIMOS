const Course = require("../models/courseModel");
const User = require("../models/userModel");


const findSubjects = async (req, res) => {

  const subjects = await Course.find().distinct('subject');

  res.json({subjects});
};


const findCourse = async (req, res) => {

  const instructor_details = await User.find({
    name: new RegExp(req.body.keyword, "i"),
    userType: "instructor",
  });

  inst = instructor_details.map((instructor) => {
    instructor._id;
  });

  const courses = await Course.find({
    $or: [
      { title: new RegExp(req.body.keyword, "i") },
      { subjects: [new RegExp(req.body.keyword, "i")] },
      { instructors: { $elemMatch: { inst } } },
    ],
  });


  res.json(courses);
};
module.exports = {
  findSubjects,
  findCourse
};
