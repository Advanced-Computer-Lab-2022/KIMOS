const Subtitle = require('../models/subtitleModel');
const { createExam, editExam, deleteExam } = require('./examController');
const { createVideo, editVideo, deleteVideo } = require('./videoController');
const mongoose = require('mongoose');
var url = require('url');
const asyncHandler = require('express-async-handler');
var ytInfo;
(async function () {
  ytInfo = (await import('../youtubeInfoFetcher.mjs')).default;
})();

const getSubtitle = async (id) => {
  const sub = await Subtitle.findById(id);
  return sub;
};

const createSubtitle = async (subtitle) => {
  const { title, videos } = subtitle;
  var totalHours = 0;
  const vids = await Promise.all(
    videos.map(async (video, index) => {
      const stringUrl = video.link;
      var videoId;
      var regExp = new RegExp(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
      var match = stringUrl.match(regExp);
      if (match && match[2].length == 11) {
        videoId = match[2];
      } else {
        videoId = -1;
      }
      if (videoId === -1) {
        throw new Error('Invalid link');
      }
      const result = await ytInfo(videoId);
      totalHours += parseInt(result[0].duration);
      const v = await createVideo({
        hours: result[0].duration,
        description: video.description,
        link: video.link
      }).catch((err) => {
        throw err;
      });
      return v._id;
    })
  );
  const sub = await Subtitle.create({
    title: title,
    hours: totalHours,
    videos: vids
  });
  return sub;
};

const updateSubtitle = async (subtitleId, subtitle) => {
  const { title, videos } = subtitle;
  const oldSub = await Subtitle.findById(subtitleId).catch((err) => {
    throw err;
  });
  var totalHours = 0;
  let videosIds = videos.map((video) => {
    const videoId = video._id;
    if (videoId) {
      return videoId.toString();
    }
    return '-1';
  });
  oldSub.videos.map(async (videoId, index) => {
    if (!videosIds.includes(videoId.toString()))
      await deleteVideo(videoId).catch((err) => {
        throw err;
      });
  });
  const newVids = await Promise.all(
    videos.map(async (video, index) => {
      const stringUrl = video.link;
      var res = {};
      var videoId;
      var regExp = new RegExp(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
      var match = stringUrl.match(regExp);
      if (match && match[2].length == 11) {
        videoId = match[2];
      } else {
        videoId = -1;
      }
      if (videoId === -1) {
        throw new Error('Invalid link');
      }
      const result = await ytInfo(videoId);
      totalHours += parseInt(result[0].duration);

      if (video._id) {
        res = await editVideo(video._id, {
          hours: result[0].duration,
          description: video.description,
          link: video.link
        }).catch((err) => {
          throw err;
        });
      } else {
        res = await createVideo({
          hours: result[0].duration,
          description: video.description,
          link: video.link
        }).catch((err) => {
          throw err;
        });
      }
      return res._id;
    })
  );
  const sub = await Subtitle.findByIdAndUpdate(
    subtitleId,
    { title: title, videos: newVids, hours: totalHours },
    { new: true }
  );
  return sub;
};

const deleteSubtitle = async (subtitleId) => {
  const sub = await Subtitle.findByIdAndDelete(subtitleId);
  if (sub) {
    sub.quizzes.map(async (quiz, index) => {
      await deleteExam(quiz._id).catch((err) => {
        throw err;
      });
    });
    sub.videos.map(async (video, index) => {
      await deleteVideo(video._id).catch((err) => {
        throw err;
      });
    });
  }
};

const addQuiz = asyncHandler(async (req, res) => {
  const { subtitleId } = req.query;
  const { quiz } = req.body;
  const ex = await createExam(quiz).catch((err) => {
    throw err;
  });
  const sub = await Subtitle.findByIdAndUpdate(subtitleId, { $push: { quizzes: ex._id } });
  res.status(200).json({ statusCode: 200, success: true, message: 'Quiz created' });
});

const editQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.query;
  const { newQuiz } = req.body;
  const ex = await editExam(quizId, newQuiz).catch((err) => {
    throw err;
  });
  res.status(200).json({ statusCode: 200, success: true, message: 'Quiz edited' });
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const { subtitleId, quizId } = req.query;
  const sub = await Subtitle.findByIdAndUpdate(subtitleId, { $pull: { quizzes: quizId } });
  await deleteExam(quizId).catch((err) => {
    throw err;
  });
  res.status(200).json({ statusCode: 200, success: true, message: 'Quiz deleted' });
});

module.exports = {
  getSubtitle,
  createSubtitle,
  updateSubtitle,
  addQuiz,
  editQuiz,
  deleteQuiz,
  deleteSubtitle
};
