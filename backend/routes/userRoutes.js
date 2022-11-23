const express = require('express');
const router = express.Router();
const {
  addUser,
  editUser,
  changePassword,
  instructorCreateCourse,
  instructorViewCourses,
  instructorCreateSubtitle,
  getCountry
} = require('../controllers/userController');

router.post('/admin/addUser', addUser);
router.get('/instructor/viewCourse', instructorViewCourses);
router.post('/instructor/addSubtitle', instructorCreateSubtitle);
router.post('/instructor/createCourse', instructorCreateCourse);
router.put('/editInformation', editUser);
router.put('/changePassword',changePassword);
//router.post('/changeCountry', changeCountry);
router.get('/country', getCountry);
module.exports = router;
