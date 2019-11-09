const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const SaleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
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

const Sale = mongoose.model('Sale', SaleSchema);
module.exports = Sale;
