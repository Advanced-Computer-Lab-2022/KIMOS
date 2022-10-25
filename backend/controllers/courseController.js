const Course = require('../models/courseModel');
const User = require('../models/userModel');
const COURSES_PER_PAGE = 10;

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

  console.log(courses);
  res.json(courses);
};

module.exports = {
  findCourse
};

const getCoursePrice = async (req, res) => {
  //bos ana ha5osh anam bas kamel enta el function ele ht3mlo enak fel
  //frontend htzbat el object bta3ak eno y include currencies ba3deen
  //el price fel backend ya2ma hn5leh object feeh el currency wel amount
  //aw nzwd field amount bas kda htconvert bel function ele 3andak ta7t deh
  //w tb3at ll front end htb2a per page bardo eb3at prices kol el courses el loaded
  const user = User.findById(req.body.id); //The id of the user coming from the frontend
  const country = user.country;
  let amount = await convert(2000, 'USD', 'EUR');
  console.log(amount); // 1667.6394564000002
};
