const express = require('express');
const router = express.Router();
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
  rateInstructor
} = require('../controllers/userController');

router.route('/').post(addUser).put(editUser).get(getUser);
router.post('/rateInstructor', rateInstructor);
router.route('/country').get(getCountry).put(changeCountry);
router.get('/rate', getRate);
router.put('/changePassword', changePassword);
router.post('/passwordResetEmail', resetPasswordSendEmail);
router.post('/passwordReset', resetPassword);
router.put('/changePassword', changePassword);
module.exports = router;
