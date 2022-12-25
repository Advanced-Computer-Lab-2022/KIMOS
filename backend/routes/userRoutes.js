const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/paymentController');
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
  sendCertificateEmail,
  viewMostPopularCourses,
  requestRefund,
  requestCourseAccess,
  viewWallet,
  viewCourseRequests,
  grantCourseAccess,
  setCoursePromotion
} = require('../controllers/userController');

const {getAllRatings} = require('../controllers/ratingController');

const {
  adminAuth,
  loggedIn,
  isRegisteredWithInstructor,
  resetPasswordAuth,
  registeredCourseAuth,
  registerCourseAuth
} = require('../middleware/auth');

const {
  createReport,
  addMessages,
  changeStatus,
  getReports
} = require('../controllers/reportController');

const { createInvoice } = require('../controllers/invoiceController');
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
  .patch(loggedIn, adminAuth, addMessages); //all good

router.post('/createCheckoutSession', loggedIn, checkout); //all good
router.post('/invoice', loggedIn, registerCourseAuth, createInvoice);
module.exports = router;
