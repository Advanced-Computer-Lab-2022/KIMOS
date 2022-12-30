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
  changeRefundStatus,
  changeAccessStatus,
  getRequests
} = require('../controllers/userController');


const {getAllRatings} = require('../controllers/ratingController');


const {
  adminAuth,
  loggedIn,
  isRegisteredWithInstructor,
  resetPasswordAuth,
  registeredCourseAuth,
  registerCourseAuth,
  instructorAuth,
  individualAuth
} = require('../middleware/auth');

const { getAllRegisteredInvoices } = require('../controllers/registeredCoursesController');
const {
  createReport,
  addMessages,
  changeStatus,
  getReports
} = require('../controllers/reportController');

const {
  createInvoice,
  getAllInvoicesInstructor,
  getAllInvoicesUser,
  refundInvoice
} = require('../controllers/invoiceController');

const { removeRegisteredUser } = require('../controllers/registeredCoursesController');
const { isLoggedIn } = require('../middleware/helper');
const { registerUser } = require('../controllers/registeredCoursesController');

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

router.post('/createCheckoutSession', loggedIn, individualAuth, checkout); //all good
router.post('/register', loggedIn, individualAuth, registerCourseAuth, createInvoice, registerUser); //all good
router.get('/invoices/instructor', loggedIn, instructorAuth, getAllInvoicesInstructor); //all good
router.get('/invoices/user', loggedIn, individualAuth, getAllInvoicesUser); //all good

router.post(
  '/refundStatus',
  loggedIn,
  adminAuth,
  changeRefundStatus,
  removeRegisteredUser,
  refundInvoice
); //all good
router.post('/accessStatus', loggedIn, adminAuth, changeAccessStatus, registerUser); //all good
router.get('/requests', loggedIn, adminAuth, getRequests); //all good

router.get('/registeredInvoices', loggedIn, individualAuth, getAllRegisteredInvoices); //// all good

module.exports = router;
