const User = require('../models/userModel')
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
module.exports = {
    addAdmin,
    addInstructor,
    addCorporateTrainee
}