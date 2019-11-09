const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const SaleSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
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

const Sale = mongoose.model('sale', SaleSchema);
module.exports = Sale;
