const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    gender: {
      type: Schema.Types.ObjectId,
      ref: 'Gender'
    },
    manufacturer: {
      type: Schema.Types.ObjectId,
      ref: 'Manufacturer'
    },
    price: {
      type: Number,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
