const Rating = require('../models/ratingModel');
const asyncHandler = require('express-async-handler');

const createRating = async (userId, ratedId, rating,review) => {
  const rate = await Rating.create({
    userId: userId,
    ratedId: ratedId,
    rating: rating,
    review: review
  });
  return rate;
};

const updateRating = async (userId, ratedId, newRating,newReview) => {
  const rating = await Rating.findOneAndUpdate(
    { userId: userId, ratedId: ratedId },
    {
      rating: newRating,
      review: newReview
    }
  );
  return rating;
};

const deleteRating = async (userId, ratedId) => {
  const rating = await Rating.findOneAndDelete({
    userId: userId,
    ratedId: ratedId
  });
  return rating;
};

const viewRating = async (userId, ratedId) => {
  const rating = await Rating.findOne({
    userId: userId,
    ratedId: ratedId
  });
  return rating;
};

const getAllRatings = asyncHandler (async (req,res)=>{
  await Rating.find({ratedId:req.query.ratedId})
  .then((response)=>{
    res.status(200).json({success:true,statusCode:200,message:"fetched ratings successfully",payload:response});
  })
})

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  viewRating,
  getAllRatings
};
