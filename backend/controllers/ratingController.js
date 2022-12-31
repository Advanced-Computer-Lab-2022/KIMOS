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

const getAllRatings = asyncHandler(async (req, res) => {
  await Rating.find({ ratedId: req.query.courseId || req.query.instructorId })
    .populate('userId', 'firstName lastName')
    .then((response) => {
      const result = response.map((rating, index) => {
        return {
          name: rating.userId.firstName + ' ' + rating.userId.lastName + ' ',
          rating: rating.rating,
          review: rating.review
        };
      });
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'fetched ratings successfully',
        payload: result
      });
    });
});
module.exports = {
  createRating,
  updateRating,
  deleteRating,
  viewRating,
  getAllRatings
};
