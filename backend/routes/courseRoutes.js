const {viewCourse,viewMyCourses} = require('../controllers/courseController')
const express = require('express')
const router = express.Router()

// router.get('/viewCourse',(req,res)=>{

//     res.send('hi')
// })

router.get('/viewCourse/:id',viewCourse)

router.get('/viewMyCourses/:id',viewMyCourses) // view the courses given by me (as instructor) given my id as param, subject
                                                // and price in the req body.

// router.get('/viewCourse',(req,res) =>{
//     Course.find()
//     .then((result)=>{
//         res.json(result)
//     })
// })










module.exports = router


