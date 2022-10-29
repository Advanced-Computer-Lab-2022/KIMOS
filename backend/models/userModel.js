const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String
      //required: [true, 'Please enter a name']
    },
    email: {
      type: String,
      //required: [true, 'Please enter an email'],
      unique: true
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

    userType: {
      type: String,
      enum: ['adminstrator', 'corporate trainee', 'individual trainee', 'instructor'],
      lowercase: true,
      required: true
    },

    country: {
      name: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
