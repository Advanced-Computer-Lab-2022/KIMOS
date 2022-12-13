const mongoose = require('mongoose');
const Joi = require('joi');

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
      sparse: true,
      validate: [validateEmail, 'Please enter a valid email address']
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
      type: {
        value: {
          type: Number,
          default: 0,
          min: 0.0,
          max: 5.0
        },
        numberOfRatings: {
          type: Number,
          default: 0
        }
      },
      default: {
        value: 0.0,
        numberOfRatings: 0
      }
    },
    userType: {
      type: String,
      enum: ['administrator', 'corporate trainee', 'individual trainee', 'instructor'],
      lowercase: true,
      required: true
    },

    country: {
      type: {
        name: {
          type: String
        },
        code: {
          type: String
        }
      },
      default: {
        name: 'Egypt',
        code: 'EG'
      }
    },
    biography: {
      type: String,
      default: ''
    },
    reset: {
      type: {
        initiated: {
          type: String
        },
        token: {
          type: String
        }
      },
      default: {
        initiated: 'false',
        token: ''
      }
    }
  },
  {
    timestamps: true
  }
);
function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ || null;
  return re.test(email);
}

module.exports = mongoose.model('User', userSchema);
