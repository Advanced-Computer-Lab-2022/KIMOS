const express = require('express');
const router = express.Router();
const {
  addInstructor,
  getContract,
  createContract,
  editContract
} = require('../controllers/contractController');

router.route('/').get(getContract).post(createContract).put(editContract);
router.route('/instructor').post(addInstructor);

module.exports = router;
