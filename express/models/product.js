const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
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
  images: {
    type: [String],
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

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
