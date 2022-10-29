const User = require('../models/userModel')
const { convert } = require('exchange-rates-api');
const {getAllInfoByISO} = require( 'iso-country-currency' );
const CC = require('currency-converter-lt')

const getCountry = async (req,res) => {
    var user_id = '635136c4072311221109475d';
    var country = null;

    try { 
        const user = await User.findOne({
            _id: user_id
        });

        if(user && user.country){
            country = user.country;
        }
    }
    catch(err){


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


const getRate = async (req, res) => {

    const country = req.body.country;
    var countryDetails = {};
    try{
         countryDetails = getAllInfoByISO(country.code);

    }
    catch(err){

        return res.json({ symbol: '$', rate: 1 }); //send price to frontend
    }
    // let amount = await convert(1, 'USD', countryDetails.currency);

    try {
        let currencyConverter = new CC({from:"USD", to:countryDetails.currency, amount:1})

        await currencyConverter.convert().then((response) => {

       return res.json({ symbol: countryDetails.symbol, rate: response }); //send price to frontend
        })
    }catch(err){


        return res.json({ symbol: '$', rate: 1 }); //send price to frontend

    }


  };

module.exports = {
    changeCountry,
    getCountry,
    getRate
}