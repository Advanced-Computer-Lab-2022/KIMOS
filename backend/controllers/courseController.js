const Course = require('../models/courseModel');
const User = require('../models/userModel');
const { getCountry } = require('./userController');
const getCountryISO3 = require('country-iso-2-to-3');
const COURSES_PER_PAGE = 10;

const viewCourse = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id' });
  }

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
const findSubjects = async (req, res) => {
  const subjects = await Course.find().distinct('subject');

  res.json({ subjects });
};

const findCourseMarsaf = async (req, res) => {
  //Just 2 for now, because the DB got only 5 courses :)
  const resultsPerPage = 2;
  let page = req.body.page ? req.body.page : 1;
  const keyword = req.body.keyword;

  page = page >= 1 ? page - 1 : page;

  const instructor_details = await User.find({
    name: new RegExp(keyword, 'i'),
    userType: 'instructor'
  });

  inst = instructor_details.map((instructor) => {
    instructor._id;
  });

  await Course.find({
    $or: [
      { title: new RegExp(keyword, 'i') },
      { subjects: [new RegExp(keyword, 'i')] },
      { instructors: { $elemMatch: { inst } } }
    ]
  })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .then((results) => {
      return res.status(200).send(results);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });

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
  findCourseMarsaf
};

const getCoursePrice = async (req, res) => {
  //bos ana ha5osh anam bas kamel enta el function ele ht3mlo enak fel
  //frontend htzbat el object bta3ak eno y include currencies ba3deen
  //el price fel backend ya2ma hn5leh object feeh el currency wel amount
  //aw nzwd field amount bas kda htconvert bel function ele 3andak ta7t deh
  //w tb3at ll front end htb2a per page bardo eb3at prices kol el courses el loaded
  const country = await getCountry(req, res); //get user country
  const price = await Course.findById(req.body.courseId).select('price'); //find course by id passed from frontend
  const countryCode = getCountryISO3(country.code);
  let amount = await convert(price, 'USD', countryCode);
  res.json(200).json({ price: amount });
  console.log(amount); // 1667.6394564000002
<<<<<<< Updated upstream

=======
};
module.exports = {
  findSubjects,
  findCourse,
  findCourseMarsaf,
  viewCourse,
  viewMyCourses
};
>>>>>>> Stashed changes
