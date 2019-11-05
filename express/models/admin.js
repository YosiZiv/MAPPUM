const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const AdminSchema = new Schema({
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
    default: 'admin',
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
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
  token: {
    type: String,
  },
});

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;
