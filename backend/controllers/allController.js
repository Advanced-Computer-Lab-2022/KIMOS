const User = require('../models/userModel')


const getCountry = async (req,res) => {
    var user_id = '635136c4072311221109475d';
    var country = null;

    try { 
        const user = await User.findOne({
            _id: user_id
        });
        console.log(user);
        if(user && user.country){
            country = user.country;
        }
    }
    catch(err){
        console.log(err);

        res.status(400).json({mssg:'error'});
        return;
    }

    res.status(200).json({country:country});


}

const changeCountry = async (req,res) => {
    var user_id = '635136c4072311221109475d';
    const newCountry = req.body.newCountry;

    try { await User.findByIdAndUpdate(user_id, { country: newCountry.code });
    }
    catch(err){

        res.status(400).json({mssg:'error'});
        return;
    }

    res.status(200).json({mssg:'updated correctly'});


}

module.exports = {
    changeCountry,
    getCountry
}