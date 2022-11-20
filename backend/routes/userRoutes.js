const express = require('express');
const router = express.Router();
const {
  addUser,
  editUser,
  instructorViewCourses,
  instructorCreateCourse,
  instructorCreateSubtitle,
  instructorCreateExercise,
  instructorAddSubtitleVideo,
  instructorAddPreviewVideo,
  instructorSetAnswer,
  instructorAddDiscount,
  viewCourse,
  getCountry,
  changeCountry,
  getRate
} = require('../controllers/userController');

router.post('/changeCountry', changeCountry);
router.get('/country', getCountry);
router.post('/rate', getRate);
router.post('/admin/addUser', addUser);
router.get('/instructor/viewCourse', instructorViewCourses);
//takes username and courseTitle as params
router.get('/viewCourse', viewCourse);
router.put('/editInformation', editUser);
//user info user = {username:"", userType:""}
//course includes preview video link
//send user info and course info as well as
//subtitle Subtitle:{title:"",hours:int,video:{link:"",description}}
//and exercise:{question:"",choices:[""],answer: int}
router.post('/instructor/createCourse', instructorCreateCourse);
router.post('/instructor/addSubtitle', instructorCreateSubtitle);
router.post('/instructor/addExercise', instructorCreateExercise);
//send user info, subtitle title as "title" and video:{link:"",description:""}
router.post('/instructor/addSubtitleVideo', instructorAddSubtitleVideo);
//send user info and video:""
router.post('/instructor/addPreviewVideo', instructorAddPreviewVideo);
//send user info, question:"" and answer:int
router.post('/instructor/setAnswer', instructorSetAnswer);
//send user info, course title as "title" and discount:{amount:int, startDate: date, endDate:date}
router.post('/instructor/addDiscount', instructorAddDiscount);
module.exports = router;
