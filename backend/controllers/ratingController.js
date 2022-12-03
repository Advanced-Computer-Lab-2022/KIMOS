const Rating = require('../models/ratingModel');

const createRating = async (userId, ratedId) => {
  const rating = Rating.create({
    userId: userId,
    ratedId: ratedId
  });
  return rating;
};

const updateRating = async (userId, ratedId, newRating) => {
  const rating = Rating.findOneAndUpdate(
    { userId: userId, ratedId: ratedId },
    {
      rating: newRating
    },
    { upsert: true }
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
  return rating || 0;
};

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  viewRating
};
