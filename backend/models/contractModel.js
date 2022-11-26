const mongoose = require('mongoose');
const contractSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    terms: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    instructors: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contract', contractSchema);
