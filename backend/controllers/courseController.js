const Course = require("../models/courseModel");
const User = require("../models/userModel");

const findCourse = async (req, res) => {
  const instructor_details = await User.find({
    name: new RegExp(req.body.keyword, "i"),
    userType: "instructor",
  });
  console.log(instructor_details);
  inst = instructor_details.map((instructor) => {
    instructor._id;
  });
  console.log(inst);
  const courses = await Course.find({
    $or: [
      { title: new RegExp(req.body.keyword, "i") },
      { subjects: [new RegExp(req.body.keyword, "i")] },
      { instructors: { $elemMatch: { inst } } },
    ],
  });

  console.log(courses);
  res.json(courses);
};
module.exports = {
  findCourse,
};
