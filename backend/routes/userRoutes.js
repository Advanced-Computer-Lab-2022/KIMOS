const express = require('express');
const router = express.Router();
const {
    addAdmin,
    addCorporateTrainee,
    addInstructor
} = require('../controllers/userController');

router.post('/admin/addAdmin',addAdmin)
router.post('/admin/addCorporateTrainee',addCorporateTrainee)
router.post('/admin/addInstructor',addInstructor)



module.exports = router;