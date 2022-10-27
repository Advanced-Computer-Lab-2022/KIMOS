const User = require('../models/userModel')
const { convert } = require('exchange-rates-api');
// Adminstrator function
// As an Adminstrator add another adminstrator and assign their username and password

const addAdmin = async (req,res) => {

    const admin = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: 'adminstrator'
    })
    res.status(200).json(admin);

}

const addInstructor = async (req,res) => {

    const inst = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: 'instructor'
    })
    res.status(200).json(inst);

}

const addCorporateTrainee = async (req,res) => {

    const ct = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: 'corporate trainee'
    })
    res.status(200).json(ct);

}


const getPrice = async (req,res) => {

    let amount = await convert(2000, 'USD', 'EUR', '2018-01-01');
    console.log(amount); 

}


module.exports = {
    addAdmin,
    addInstructor,
    addCorporateTrainee
}