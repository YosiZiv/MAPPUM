const mongoose = require('mongoose');

const { Schema } = mongoose;

//  Create Schema
const SalesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false,
    },
    productName: {
        type: String,
        required: true,
        maxlength: 30,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    sellPrice: {
        type: Number,
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
        default: "stage1",
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});


const Sales = mongoose.model('sales', SalesSchema);
module.exports = Sales;
