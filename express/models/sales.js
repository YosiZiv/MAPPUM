const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const SalesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  product: {
    type: { type: Schema.Types.ObjectId, ref: 'product' },
  },
  active: {
    required: true,
    type: Boolean,
    default: true,
  },
  stage: {
    required: true,
    type: String,
    default: 'stage1',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model('sales', SalesSchema);
module.exports = Sales;
