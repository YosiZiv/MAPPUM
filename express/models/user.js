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
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customers: {
    type: [Schema.Types.ObjectId],
    ref: 'Customer',
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
  },
  isDelete: {
    type: Boolean,
    default: false,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
