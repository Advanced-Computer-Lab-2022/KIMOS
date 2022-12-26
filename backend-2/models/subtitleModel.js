const mongoose = require('mongoose');

const subtitleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    hours: {
      type: Number,
      required: true
    },
    video: {
      link: {
        type: String
      },
      description: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subtitle', subtitleSchema);
