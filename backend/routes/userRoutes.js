const express = require('express');
const router = express.Router();
const {
  addUser,
  instructorCreateCourse,
  instructorViewCourses,
  changeCountry,
  getCountry
} = require('../controllers/userController');

router.post('/admin/addUser', addUser);
router.get('/instructor/viewCourse', instructorViewCourses);
router.post('/instructor/createCourse', instructorCreateCourse);
router.post('/changeCountry', changeCountry);
router.get('/country', getCountry);
module.exports = router;
