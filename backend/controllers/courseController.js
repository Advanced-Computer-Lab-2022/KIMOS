const Course = require('../models/courseModel');
const User = require('../models/userModel');
const COURSES_PER_PAGE = 10;


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
  const user = User.findById(req.body.id); //The id of the user coming from the frontend
  const country = user.country;
  let amount = await convert(2000, 'USD', 'EUR');
  console.log(amount); // 1667.6394564000002

