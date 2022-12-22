const { faker } = require('@faker-js/faker');
const connectDB = require('./config/db');
const Course = require('./models/courseModel');

const instructorId = '638117c243cba3f0babcc3a9';

generateCourse = ()=>{
    let title = faker.name.jobTitle();
    let subject = faker.name.jobArea();
    let subtitles = [];
    let price = faker.datatype.number({'min': 10, 'max': 50 });
    let totalHours = faker.datatype.number({'min': 3, 'max': 40 });
    let summary = faker.lorem.paragraphs(1);
    let exams = [];
    let preview = '';
    let instructor = instructorId;

    return {
            title: title,
            subject: subject,
            subtitles: subtitles,
            price:  price,
            totalHours: totalHours,
            summary: summary || '',
            exams: [],
            preview: preview || '',
            instructor: instructor
    }

}
main = async ()=>{
    try{
        await connectDB();    
        for(let i = 0; i < 15 ; i++){
            try{
                await Course.create(generateCourse())
                console.log('Added Course');
            }catch(e){
                console.log('could not add course');
            }

        }
        // const newCourse = await Course.create({
        //     title: course.title,
        //     subject: course.subject,
        //     subtitles: subtitles,
        //     price: course.price,
        //     totalHours: totalHours,
        //     summary: course.summary || '',
        //     exams: [],
        //     preview: course.preview || '',
        //     instructor: user.userId
        //   });
        
 

    
    }catch(e){
        console.log(e.message);
    }
    
}

viewAllCourses = ()=>{
    Course.find({}, function(err, docs) {
        if (!err) { 
            console.log(docs);
        }
        else {

        }
    });
}
main();

// console.log(generateCourse());