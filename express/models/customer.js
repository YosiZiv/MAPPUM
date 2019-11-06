const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const CustomerSchema = new Schema({
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

  address: {
    type: String,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  sales: {
    type: [Schema.Types.ObjectId],
    ref: 'sale',
  },
  user: {
    type: Schema.Types.ObjectId,
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
});

const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer;
