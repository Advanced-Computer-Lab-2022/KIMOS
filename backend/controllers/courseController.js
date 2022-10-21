const Course = require('../models/courseModel')

const findCourse = async (req,res) => {
    // const instructor_details = User.find({name:new RegExp('^'+req.body.keyword+'$', "i"), userType:'instructor'}).toArray();
    // inst = instructor_details.map( (instructor) => {
    //     instructor._id
    // })

    // Course.find({$or:[{title: new RegExp('^'+req.body.keyword+'$', "i")},{subjects: [new RegExp('^'+req.body.keyword+'$', "i")]},{instructors : inst}]});

   return {'data':'course'}

};
module.exports = {
    findCourse
};
