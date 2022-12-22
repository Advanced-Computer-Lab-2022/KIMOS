const Rating = require('../models/ratingModel');

const createRating = async (userId, ratedId, rating) => {
  const rate = Rating.create({
    userId: userId,
    ratedId: ratedId,
    rating: rating
  });
  return rate;
};

const updateRating = async (userId, ratedId, newRating) => {
  const rating = Rating.findOneAndUpdate(
    { userId: userId, ratedId: ratedId },
    {
      rating: newRating
    }
  );
  return rating;
};

const deleteRating = async (ratingId) => {
  const rating = Rating.deleteOne({
    _id: ratingId
  });
  return rating;
};

const viewRating = async (userId, ratedId) => {
  const rating = Rating.findOne({
    userId: userId,
    ratedId: ratedId
  });
  return rating;
};

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  viewRating
};