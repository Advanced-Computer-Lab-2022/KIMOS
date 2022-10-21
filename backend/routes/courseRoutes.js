const express = require('express');
const router = express.Router();
const {
    findCourse
} = require('../controllers/courseController');

router.post('/findCourse',findCourse)


//this was missing
module.exports=router;