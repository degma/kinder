const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    manufacturer: {
      type: String,
      required: true
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

module.exports = mongoose.model('Product', productSchema);
