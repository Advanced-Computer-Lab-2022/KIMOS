const Course = require("../models/courseModel");
const User = require("../models/userModel");


const findSubjects = async (req, res) => {

  const subjects = await Course.find().distinct('subject');

  res.json({subjects});
};

const findCourseMarsaf = async (req, res) => {

  //Just 2 for now, because the DB got only 5 courses :)
  const resultsPerPage = 2;
  let page = req.body.page ? req.body.page:1;
  const keyword = req.body.keyword;

  page = page >= 1 ? page - 1 : page;

  const instructor_details = await User.find({
    name: new RegExp(keyword, "i"),
    userType: "instructor",
  });

  inst = instructor_details.map((instructor) => {
    instructor._id;
  });

  await Course.find({
    $or: [
      { title: new RegExp(keyword, "i") },
      { subjects: [new RegExp(keyword, "i")] },
      { instructors: { $elemMatch: { inst } } },
    ]
  }).limit(resultsPerPage).skip(resultsPerPage * page).then((results)=>{

    return res.status(200).send(results);
  }).catch((err) => {
    return res.status(500).send(err);
});

  // res.json({'mssg':'error occured'});
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
  findCourse,
  findCourseMarsaf
};
