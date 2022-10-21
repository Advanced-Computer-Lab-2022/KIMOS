const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title:{
        type:String,
    },
    price:{
        type:Number,
        min:0.0
    },
    rating:{
        type:Number,
        default:0.0,
        min:0.0,
        max:5.0
    },
    totalHours:{
        type:Number,
        min:0.0
    },
    discount:{
        type:Number,
        min:0.0,
        max:100.0,
        default:0.0
    },
    subjects:{
        type:[String],
    },
    instructors:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    subtitle:{
        type: String,
        ref: 'Course'
    },
    exercises:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Exercise'
    }
   
},{
    timestamps:true,
})

module.exports = mongoose.model('Course',courseSchema);