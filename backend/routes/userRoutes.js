const express = require('express');
const router = express.Router();
const {
  addUser,
  editUser,
  changePassword,
  getCountry,
  changeCountry,
  getRate,
  getUser
} = require('../controllers/userController');

router.route('/').post(addUser).put(editUser).get(getUser);
router.put('/changeCountry', changeCountry);
router.get('/country', getCountry);
router.get('/rate', getRate);
router.put('/changePassword', changePassword);
module.exports = router;
