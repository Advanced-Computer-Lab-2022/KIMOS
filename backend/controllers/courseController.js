const Course = require('../models/courseModel');
const User = require('../models/userModel');

const findCourse = async (req, res) => {
  let courses = [];
  const keywords = req.body.keyword.split(' ');
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const instructor_details = await User.findOne({
      name: new RegExp(keyword, 'i'),
      userType: 'instructor'
    });

    const coursesKeyword = await Course.find({
      $or: [
        { title: new RegExp(keyword, 'i') },
        { subjects: [new RegExp(keyword, 'i')] },
        {
          instructor: instructor_details._id
        }
      ]
    });
    for (let j = 0; j < coursesKeyword.length; j++) {
      if (!courses.includes(coursesKeyword[j])) {
        courses.push(coursesKeyword[j]);
      }
    }
  }
  console.log(courses);
  res.json(courses);
};

module.exports = {
  findCourse
};
