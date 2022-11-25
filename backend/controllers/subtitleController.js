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
    video: video || {}
  });
  return sub;
};

const enterVideo = async (subtitleId, video) => {
  const sub = await Subtitle.findByIdAndUpdate(subtitleId, {
    video: video
  });
};

module.exports = {
  getSubtitle,
  createSubtitle,
  enterVideo
};
