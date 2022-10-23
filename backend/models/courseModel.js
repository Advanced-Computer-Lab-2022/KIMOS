const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required: [true,'Please enter a title']
    },
    price:{
        type:Number,
        min:0.0,
        required: [true,'Please enter a price']
    },
    rating:{
        type:Number,
        default:0.0,
        min:0.0,
        max:5.0
    },
    totalHours:{
        type:Number,
        min:0.0,
        required: [true,'Please enter the total hours']
    },
    discount:{
        type:Number,
        min:0.0,
        max:100.0,
        default:0.0
    },
    subject:{
        type:String,
        required: [true,'Please enter a subject']
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subtitles:{
        type: [String],
        required: [true,'Please enter a subtitle']
        
    },
    exercises:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Exercise'
    }
   
},{
    timestamps:true,
})

module.exports = mongoose.model('Course',courseSchema);