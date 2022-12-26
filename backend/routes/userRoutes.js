const express = require('express');
const router = express.Router();
const {
  addUser,
  editUser,
  changePassword,
  getCountry,
  changeCountry,
  getRate,
  getMe,
  viewInstructorDetails,
  resetPasswordSendEmail,
  resetPassword,
  rateInstructor,
  getCertificate,
  sendCertificateEmail
} = require('../controllers/userController');

const {
  adminAuth,
  loggedIn,
  isRegisteredWithInstructor,
  resetPasswordAuth,
  registeredCourseAuth
} = require('../middleware/auth');

const {
  createReport,
  addMessages,
  changeStatus,
  getReports
} = require('../controllers/reportController');
const { isLoggedIn } = require('../middleware/helper');

router.route('/').post(loggedIn, adminAuth, addUser).put(loggedIn, editUser).get(loggedIn, getMe); //all good
router.get('/viewInstructorDetails', loggedIn, isRegisteredWithInstructor, viewInstructorDetails); //all good
router.post('/rateInstructor', loggedIn, isRegisteredWithInstructor, rateInstructor); //all good
router.route('/country').get(isLoggedIn, getCountry).put(isLoggedIn, changeCountry); //all good
router.get('/rate', getRate); //all good
router.put('/changePassword', loggedIn, changePassword); //all good
router.post('/passwordResetEmail', resetPasswordSendEmail); //all good
router.post('/passwordReset', resetPasswordAuth, resetPassword); //all good
router.get('/certificate', loggedIn, registeredCourseAuth, getCertificate); //all good
router
  .route('/report')
  .post(loggedIn, registeredCourseAuth, createReport) //all good
  .get(loggedIn, getReports) //all good
  .put(loggedIn, adminAuth, changeStatus) //all good
  .patch(loggedIn, addMessages); //all good
module.exports = router;
