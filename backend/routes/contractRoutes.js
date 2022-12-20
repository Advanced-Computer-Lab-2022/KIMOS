const express = require('express');
const router = express.Router();
const {
  addInstructor,
  getContract,
  createContract,
  editContract,
  tmpGetContract,
  removeInstructor
} = require('../controllers/contractController');

router.route('/').get(tmpGetContract).post(createContract).put(editContract);
router.route('/instructor').post(addInstructor).delete(removeInstructor);




router.get("/khalid",  (req, res, next) =>{
  console.log('hi hi hi ');
});
module.exports = router;
