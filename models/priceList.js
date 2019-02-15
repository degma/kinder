const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  validFrom: {
    type: String,
    required: true
  },
  validTo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  prodprices: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    price: {
      type: Number,
      required: false
    }
  }
  ]
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PriceList', priceListSchema);
