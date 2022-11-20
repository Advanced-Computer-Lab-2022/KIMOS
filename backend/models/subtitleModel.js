const mongoose = require('mongoose');

const subtitleSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true
    },
    Hours: {
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
