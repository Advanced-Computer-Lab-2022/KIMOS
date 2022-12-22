const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true
    },
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password']
    },
    rating: {
      value:{
        type: Number,
        default: 0,
        min: 0.0,
        max: 5.0
      },
      numberOfRatings:{
        type: Number,
        default:0
      }
    },

    userType: {
      type: String,
      enum: ['administrator', 'corporate trainee', 'individual trainee', 'instructor'],
      lowercase: true,
      required: true
    },

    country: {
      name: {
        type: String,
        default: 'Egypt'
      },
      code: {
        type: String,
        default: 'EG'
      }
    },
    biography: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
