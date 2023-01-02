const Video = require('../models/videoModel');

const createVideo = async (video) => {
  console.log(video);
  const { description, link, hours } = video;
  const vid = await Video.create({
    link: link ||'',
    description: description || '',
    hours: hours||0
  });
  return vid;
};
const editVideo = async (id, newVideo) => {
  const vid = await Video.findByIdAndUpdate(id, newVideo, { new: true });
  return vid;
};
const deleteVideo = async (id) => {
  const vid = await Video.findByIdAndDelete(id);
};
const getVideo = async (id) => {
  return await Video.findById(id);
};
module.exports = { getVideo, createVideo, deleteVideo, editVideo };
