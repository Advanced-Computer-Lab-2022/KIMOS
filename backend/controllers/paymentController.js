const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const User = require("../models/userModel") 
const Course = require("../models/courseModel")
const {getCountryIso} = require("./userController");
const asyncHandler = require('express-async-handler');

const checkout = asyncHandler(async (req, res) => {

    const userInfo = await User.findById(res.locals.userId);
    const currency =  getCountryIso(userInfo.country.code).catch((err) => {throw err});
    const courseInfo = await Course.findById(req.query.courseId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
            currency: currency,
            product_data: {
              name: courseInfo.name
            },
            unit_amount: courseInfo.price*100
          }
      }],
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    res.status(200).json({ payload: session.url, success: true, message: 'Details edited', statusCode: 200 });
  })
