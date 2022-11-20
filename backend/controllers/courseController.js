const Course = require('../models/courseModel');
const User = require('../models/userModel');
const { getSubtitle, createSubtitle } = require('./subtitleController');

// const viewCourse = async (req, res) => {
//   const id = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: 'Invalid id' });
//   }

//   course = await Course.findById(req.params.id);

//   if (!course) {
//     return res.status(404).json({ error: 'No such course' });
//   }

//   res.status(200).json(course);
// };

// const viewMyCourses = async (req, res) => {
//   // based on instructors id given as parameter , subject and price given in the req's body
//   const id = req.params.id;
//   const subject = req.query.subject;
//   const price = req.query.price;
//   console.log(price);
//   console.log(subject);
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: 'Invalid id' });
//   }

//   if (price != -1 && subject != 'undefined') {
//     courses = await Course.find({
//       $and: [{ instructor: id }, { $or: [{ subject: subject }, { price: price }] }]
//     });
//   } else if (subject != 'undefined') {
//     courses = await Course.find({ $and: [{ instructor: id }, { subject: subject }] });
//   } else if (price != -1) {
//     courses = await Course.find({ $and: [{ instructor: id }, { price: price }] });
//   } else {
//     courses = await Course.find({ instructor: id });
//   }

//   //courses = await Course.find({instructors:id})
//   // console.log(courses)

//   if (!courses) {
//     return res.status(200).json({ error: 'No courses' });
//   }

//   res.status(200).json(courses);
// };

const findSubjects = async (req, res) => {
  const subjects = await Course.find().distinct('subject');

  res.json({ subjects });
};

const createCourse = async (course) => {
  var subtitles = null;
  var exercises = null;
  var totalHours = 0;
  if (course.subtitles.length) {
    const promises = course.subtitles.map(async (subtitle, index) => {
      const sub = await createSubtitle(subtitle);
      return sub;
    });
    subtitles = await Promise.all(promises);
    promises = course.exercises.map(async (exercise, index) => {
      const ex = await createExercise(exercise);
      return ex;
    });
    exercises = await Promise.all(promises);
    subtitles.map((subtitle, index) => {
      totalHours += parseInt(subtitle.hours);
    });
  }
  const newCourse = await Course.create({
    title: course.title,
    subject: course.subject,
    subtitles: subtitles || [],
    price: course.price,
    totalHours: totalHours,
    summary: course.summary || '',
    exercises: exercises || [],
    preview: course.preview,
    instructor: course.instructor
  });
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

const getCourse = async (title) => {
  const course = await Course.findOne({ title: title });
  return course;
};

const enterPreviewVideo = async (title, video) => {
  const course = await Course.findOne({ title: title, preview: video });
  return course;
};

const addDiscount = async (title, discount) => {
  const course = await Course.findOneAndUpdate({ title: title }, { discount: discount });
  return course;
};
module.exports = {
  findSubjects,
  findCourseMarsaf,
  createCourse,
  getCourse,
  enterPreviewVideo,
  addDiscount
  //viewCourse
  //viewMyCourses
};
