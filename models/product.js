const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    genderId: {
      type: Schema.Types.ObjectId,
      ref: 'Gender'
    },
    manufacturerId: {
      type: Schema.Types.ObjectId,
      ref: 'Manufacturer'
    },
    productprice: [{
      type: Schema.Types.ObjectId,
      ref: 'ProductPrice'
    }],
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
