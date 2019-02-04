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
      
    },
    phone: {
      type: String,
      
    },
    primary_contact_name: {
      type: String,
      
    },
    primary_contact_phone: {
      type: String,      
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

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
