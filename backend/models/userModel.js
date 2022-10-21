const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required: [true,'Please enter a name']
    },
    email:{
        type:String,
        required: [true,'Please enter an email'],
        unique: true
    },
    password:{
        type:String,
        required: [true,'Please enter a password']
    },
   
    userType:{
        type: String,
        enum : ['adminstrator','corporate trainee','individual trainee','instructor'],
        lowercase: true,
        required:true

    }

    country:{
        type:String,
        required:[true,'Please choose a country']
    },
},{
    timestamps:true,
})

module.exports = mongoose.model('User',userSchema);