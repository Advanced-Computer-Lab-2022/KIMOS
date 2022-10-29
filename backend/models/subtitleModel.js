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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subtitle', subtitleSchema);
