const Course = require('../models/courseModel');
const User = require('../models/userModel');
const { createSubtitle } = require('./subtitleController');

const findSubjects = async (req, res) => {
  const subjects = await Course.find().distinct('subject');
  res.json({ subjects });
};

const createCourse = async (course) => {
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
      return res.status(400).send(err);
    });
};

const getCourse = async (id) => {
  const course = await Course.findById(id);
  return course;
};

const enterPreviewVideo = async (courseId, video) => {
  const course = await Course.findByIdAndUpdateAndUpdate(courseId, { preview: video });
  return course;
};

const addExercise = async (courseId, exerciseId) => {
  const course = Course.findByIdAndUpdate(courseId, { $push: { exercises: exerciseId } });
  return course;
};

const addSubtitle = async (courseId, subtitleId) => {
  const course = Course.findByIdAndUpdate(courseId, { $push: { subtitles: subtitleId } });
  return course;
};

const addDiscount = async (title, discount) => {
  const { startDate, endDate } = discount.duration;
  const date = endDate;
  const course = await Course.findOneAndUpdate({ title: title }, { discount: discount });
  const job = schedule.scheduleJob(date, async function (title) {
    const courseUpdate = await Course.findOneAndUpdate(
      { title: title },
      { discount: {} },
      { new: true }
    );
    return courseUpdate;
  });
  return course;
};

const findCourseByExam = async (examId) => {
  const course = await Course.findOne({ exams: { $elemMatch: examId } });
  return course;
};
const findCourseBySubtitle = async (subtitleId) => {
  const course = await Course.findOne({ subtitles: { $elemMatch: subtitleId } });
  return course;
};

module.exports = {
  findSubjects,
  findCourseMarsaf,
  createCourse,
  getCourse,
  enterPreviewVideo,
  addExercise,
  addSubtitle,
  addDiscount,
  findCourseByExam,
  findCourseBySubtitle
  //viewCourse
  //viewMyCourses
};
