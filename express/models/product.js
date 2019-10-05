const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const ProductSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    required: false,
  },
  productName: {
    type: String,
    required: true,
    maxlength: 40,
  },
  description: {
    type: String,
    required: true,
    maxlength: 256,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  isDelete: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Products = mongoose.model('products', ProductSchema);
module.exports = Products;
