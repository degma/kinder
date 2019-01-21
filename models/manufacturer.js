const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const manufacturerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    primary_contact_name: {
      type: String,
      required: true
    },
    primary_contact_phone: {
      type: String,
      required: true
    }
  },   
    { 
      timestamps: true 
    }
);

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
