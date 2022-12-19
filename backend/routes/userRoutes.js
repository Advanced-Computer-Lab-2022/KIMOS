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

const { isLoggedIn } = require('../middleware/helper');

router.route('/').post(loggedIn, adminAuth, addUser).put(loggedIn, editUser).get(loggedIn, getMe); //all good
router.get('/viewInstructorDetails', loggedIn, isRegisteredWithInstructor, viewInstructorDetails);
router.post('/rateInstructor', loggedIn, isRegisteredWithInstructor, rateInstructor);
router.route('/country').get(isLoggedIn, getCountry).put(isLoggedIn, changeCountry); //all good
router.get('/rate', getRate); //all good
router.put('/changePassword', loggedIn, changePassword); //all good
router.post('/passwordResetEmail', resetPasswordSendEmail); //all good
router.post('/passwordReset', resetPasswordAuth, resetPassword); //all good
router.put('/changePassword', loggedIn, changePassword); //all good
router
  .route('/certificate', loggedIn, registeredCourseAuth)
  .get(getCertificate)
  .post(sendCertificateEmail);
module.exports = router;
