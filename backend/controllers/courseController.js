const Course = require('../models/courseModel');
const User = require('../models/userModel');
const { getCountry } = require('./userController');
const { getAllInfoByISO } = require('iso-country-currency');
const COURSES_PER_PAGE = 10;

const viewCourse = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id' });
  }

  course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ error: 'No such course' });
  }

  res.status(200).json(course);
};

const viewMyCourses = async (req, res) => {
  // based on instructors id given as parameter , subject and price given in the req's body
  const id = req.params.id;
  const subject = req.query.subject;
  const price = req.query.price;
  console.log(price);
  console.log(subject);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id' });
  }

  if (price != -1 && subject != 'undefined') {
    courses = await Course.find({
      $and: [{ instructor: id }, { $or: [{ subject: subject }, { price: price }] }]
    });
  } else if (subject != 'undefined') {
    courses = await Course.find({ $and: [{ instructor: id }, { subject: subject }] });
  } else if (price != -1) {
    courses = await Course.find({ $and: [{ instructor: id }, { price: price }] });
  } else {
    courses = await Course.find({ instructor: id });
  }

  //courses = await Course.find({instructors:id})
  // console.log(courses)

  if (!courses) {
    return res.status(200).json({ error: 'No courses' });
  }

  res.status(200).json(courses);
};

const findSubjects = async (req, res) => {
  const subjects = await Course.find().distinct('subject');

  res.json({ subjects });
};

const findCourseMarsaf = async (req, res) => {
  const resultsPerPage = 10;
  let page = req.body.page ? req.body.page : 1;
  const keyword = req.body.keyword;
  console.log('keyword: ', keyword);

  page = page >= 1 ? page - 1 : page;

  const instructor_details = await User.find({
    name: new RegExp(keyword, 'i'),
    userType: 'instructor'
  });
  const instructorIds = instructor_details.map((instructor, index) => {
    return instructor._id;
  });
  console.log(instructorIds);

  const courses = await Course.find({
    $or: [
      { title: new RegExp(keyword, 'i') },
      { subject: new RegExp(keyword, 'i') },
      { instructor: { $in: instructorIds } }
    ]
  })
    .skip(resultsPerPage * page)
    .limit(resultsPerPage);
  // .then((results) => {
  //   console.log(results);
  //   return res.status(200).send(results);
  // })
  // .catch((err) => {
  //   return res.status(500).send(err);
  // });
  console.log(courses);
  return res.status(200).send(courses);

  // res.json({'mssg':'error occured'});
};
const findCourse = async (req, res) => {
  const pageNumber = req.headers.pageNumber;
  const keyword = req.body.keyword;
  const instructor_details = await User.findOne({
    name: new RegExp(keyword, 'i'),
    userType: 'instructor'
  });

  const courses = await Course.find({
    $or: [
      { title: new RegExp(keyword, 'i') },
      { subject: new RegExp(keyword, 'i') },
      {
        instructor: instructor_details._id
      }
    ]
  })
    .skip((pageNumber - 1) * COURSES_PER_PAGE)
    .limit(COURSES_PER_PAGE);

  res.json(courses);
};

module.exports = {
  findSubjects,
  findCourse,
  findCourseMarsaf,
  viewCourse,
  viewMyCourses
};
