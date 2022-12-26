const Subtitle = require('../models/subtitleModel');

const getSubtitle = async (id) => {
  const sub = await Subtitle.findById(id);
  return sub;
};

const createSubtitle = async (subtitle) => {
  const { title, hours, video } = subtitle;
  const sub = await Subtitle.create({
    title: title,
    hours: hours,
    video: video
  });
  return sub;
};

const updateSubtitle = async (subtitleId, subtitle) => {
  const sub = await Subtitle.findByIdAndUpdate(subtitleId, subtitle, { new: true });
  return sub;
};

module.exports = {
  getSubtitle,
  createSubtitle,
  updateSubtitle
};
