const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    
},{
    timestamps:true,
})

module.exports = mongoose.model('Exercise',exerciseSchema);