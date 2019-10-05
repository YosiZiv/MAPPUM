const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 40,
  },
  zahot: {
    type: Number,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  sales: {
    type: [Schema.Types.ObjectId],
    ref: 'sales',
    required: false,
  },
  isDelete: {
    type: Boolean,
    default: false,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
