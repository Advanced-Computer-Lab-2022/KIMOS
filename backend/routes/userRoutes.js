const express = require('express');
const router = express.Router();
const {checkout} = require("../controllers/paymentController");
const {
  addUser,
  editUser,
  changePassword,
  getCountry,
  changeCountry,
  getRate,
  getUser,
  resetPasswordSendEmail,
  resetPassword,
  rateInstructor,
  getCertificate,
  sendCertificateEmail,
  viewMostPopularCourses,
  requestRefund,
  requestCourseAccess,
  viewWallet,
  viewCourseRequests,
  grantCourseAccess,
  setCoursePromotion
} = require('../controllers/userController');

const {
  isAdmin,
  loggedIn,
  isRegisteredWithInstructor,
  resetPasswordAuth,
  isRegisteredToCourse,
  isInstructor,
  isCorporateTrainee
} = require('../middleware/auth');

router.route('/', loggedIn).post(isAdmin, addUser).put(editUser).get(getUser);
router.post('/rateInstructor', loggedIn, isRegisteredWithInstructor, rateInstructor);
router.route('/country').get(getCountry).put(changeCountry);
router.get('/rate', getRate);
router.put('/changePassword', loggedIn, changePassword);
router.post('/passwordResetEmail', resetPasswordSendEmail);
router.post('/passwordReset', resetPasswordAuth, resetPassword);
router.put('/changePassword', loggedIn, changePassword);
router.post("/createCheckoutSession", checkout)
router
  .route('/certificate', loggedIn, isRegisteredToCourse)
  .get(getCertificate)
  .post(sendCertificateEmail);
module.exports = router;
