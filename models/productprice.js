const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productPriceSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  pricelistId: {
    type: Schema.Types.ObjectId,
    ref: 'PriceList'
  },
  price: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ProductPrice', productPriceSchema);