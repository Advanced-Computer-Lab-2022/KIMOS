const Course = require('../models/courseModel');
const User = require('../models/userModel');
const { createSubtitle } = require('./subtitleController');
const { createExam } = require('./examController');

const createCourse = async (course) => {
  var totalHours = 0;
  if (course.subtitles.length) {
    const promises = course.subtitles.map(async (subtitle, index) => {
      const sub = await createSubtitle(subtitle);
      return sub;
    });
    subtitles = await Promise.all(promises);
    subtitles.map((subtitle, index) => {
      totalHours += parseInt(subtitle.hours);
    });
  }
  const newCourse = await Course.create({
    title: course.title,
    subject: course.subject,
    subtitles: subtitles,
    price: course.price,
    totalHours: totalHours,
    summary: course.summary || '',
    exercises: [],
    preview: course.preview,
    instructor: course.instructor
  });
};

const findCourses = async (req, res) => {
  const resultsPerPage = 10;
  var courses = [];
  const instructor_id = req.body.instructor_id || -1;
  let page = req.body.page ? req.body.page : 1;
  const keyword = req.body.keyword;
  page = page >= 1 ? page - 1 : page;

  const instructor_details = await User.find({
    name: new RegExp(keyword, 'i'),
    userType: 'instructor'
  });
  const instructorIds = instructor_details.map((instructor, index) => {
    return instructor._id;
  });

  if (instructor_id != -1) {
    courses = await Course.find({
      $and: [
        {
          instructor: instructor_id,
          $or: [
            { title: new RegExp(keyword, 'i') },
            { subject: new RegExp(keyword, 'i') },
            { instructor: { $in: instructorIds } }
          ]
        }
      ]
    })
      .skip(resultsPerPage * page)
      .limit(resultsPerPage)
      .then(async (results) => {
        const promises = results.map(async (result, index) => {
          console.log(result);
          var finalResults = await (await result.populate('subtitles')).populate('exams');
          finalResults.exams = await finalResults.exams.populate('exercises');
          return finalResults;
        });
        const returnResult = Promise.all(promises);
        return res.status(200).send(returnResult);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } else {
    await Course.find({
      $or: [
        { title: new RegExp(keyword, 'i') },
        { subject: new RegExp(keyword, 'i') },
        { instructor: { $in: instructorIds } }
      ]
    })
      .skip(resultsPerPage * page)
      .limit(resultsPerPage)
      .then(async (results) => {
        const promises = results.map(async (result, index) => {
          console.log(result);
          var finalResults = await (
            await result.populate('subtitles', 'title')
          ).populate('exams', 'title');
          return finalResults;
        });
        const returnResult = Promise.all(promises);
        return res.status(200).send(returnResult);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
};

const findSubjects = async (req, res) => {
  const subjects = await Course.find().distinct('subject');
  res.json({ subjects });
};

const addDiscount = async (courseId, discount) => {
  const { startDate, endDate } = discount.duration;
  await schedule.gracefulShutdown();
  const job1 = schedule.scheduleJob(startDate, async function (title) {
    const course = await Course.findByIdAndUpdate(courseId, { discount: discount });
  });
  const job2 = schedule.scheduleJob(endDate, async function (title) {
    const courseUpdate = await Course.findByIdAndUpdate(courseId, { discount: {} }, { new: true });
    return courseUpdate;
  });
};

const viewCourse = async (req, res) => {
  const { userId, courseId } = req.query;
  try {
    var courseInfo = Course.findById(courseId);
    if (courseInfo.registeredUsers.includes(userId)) {
      const course = await getCourse(courseId);
      courseInfo = await course.populate('subtitles').populate('exams');
      courseInfo.exams = courseInfo.exams.map(async (exam, index) => {
        const ex = await getExam(exam._id, false);
        return ex;
      });
      console.log(courseInfo);
      res.status(200).json(courseInfo);
    } else res.status(401).json({ message: 'Not registered to course' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addExam = async (req, res) => {
  const { userId, courseId, exercises } = req.body;
  const courseInfo = await getCourse(courseId);
  if (userId === courseInfo.instructor) {
    try {
      const exam = createExam(exercises);
      Course.findByIdAndUpdate(courseId, { $push: { exams: exam._id } });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

const findExam = async (req, res) => {
  const { userId, courseId, examId } = req.body;
  const courseInfo = await getCourse(courseId);
  if (userId === courseInfo.instructor) {
    try {
      const exam = getExam(examId, true);
      res.status(200).json({ exam });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    if (courseInfo.registeredUsers.includes(userId)) {
      const exam = getExam(examId, false);
      res.status(200).json({ exam });
    }
  }
};

const modifyExam = async (req, res) => {
  const { user, courseId, exercises } = req.body;
  const courseInfo = await getCourse(courseId);
  if (user.userId === courseInfo.instructor) {
    try {
      const exam = editExam(exercises);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

const editCourse = async (req, res) => {
  const { user, courseId, course, flagDiscount } = req.body;
  const courseInfo = Course.findById(courseId);
  if (user.userId === courseInfo.instructor) {
    if (flagDiscount) {
      await addDiscount(courseId, course.discount);
    }
    course.subtitles.map((subtitle, index) => {
      if (subtitle._id) {
        updateSubtitle(subtitle._id, subtitle);
      } else {
        createSubtitle(subtitle);
      }
    });

    res.status(200).json({ message: 'Successful' });
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

module.exports = {
  findSubjects,
  findCourses,
  createCourse,
  viewCourse,
  modifyExam,
  findExam,
  addExam,
  editCourse
};
