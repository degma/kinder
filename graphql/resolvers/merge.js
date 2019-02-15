const Event = require('../../models/event');
const PriceList = require('../../models/priceList');
const ProductPrice = require('../../models/productprice');
const Product =  require('../../models/product');
const User = require('../../models/user');
const Category = require('../../models/category');
const Gender = require('../../models/gender');
const Manufacturer = require('../../models/manufacturer');
const { dateToString } = require('../../helpers/date');


const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};


const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const product = async productId => {
  try {
    const product = await Product.findById(productId);
    console.log("transforming product: " + product)
    return transformProduct(product);
  } catch (err) {
    throw err;
  }
};


const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};


const gender = async genderId => {
  try {
    const gender = await Gender.findById(genderId);
    return {
      ...gender._doc,
      _id: gender.id,
    };
  } catch (err) {
    throw err;
  }
};

const manufacturer = async manufacturerId => {
  try {
    const manufacturer = await Manufacturer.findById(manufacturerId);
    return {
      ...manufacturer._doc,
      _id: manufacturer.id,
    };
  } catch (err) {
    throw err;
  }
};

const category = async categoryId => {
  try {
    const category = await Category.findById(categoryId);
    return {
      ...category._doc,
      _id: category.id,
    };
  } catch (err) {
    throw err;
  }
};


const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};


const transformGender = gender => {
  return {
    ...gender._doc,
    _id: gender.id
  };
};


const transformProduct = product => {
  return {
    ...product._doc,
    _id: product.id,
    genderId: gender.bind(this, product.genderId),
    manufacturerId: manufacturer.bind(this, product.manufacturerId),
    categoryId: category.bind(this, product.categoryId),
    creator: user.bind(this, product.creator)
  };
};

const transformManufacturer = manufacturer => {
  return {
    ...manufacturer._doc,
    _id: manufacturer.id,
    creator: user.bind(this, manufacturer.creator)
  };
};

const transformCategory = category => {
  return {
    ...category._doc,
    _id: category.id,
    creator: user.bind(this, category.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

const transformProductPrice = productprice => {
  return {
    ...productprice._doc,
    _id: productprice.id,
    productId: product.bind(this, productprice.productId),
    pricelistId: pricelist.bind(this, productprice.pricelistId),
  }
};

const pricelist = async pricelistId => {
  try {
    const pricelist = await PriceList.findById(pricelistId);
    return transformPriceList(pricelist);
  } catch (err) {
    throw err;
  }
};

const productprice = async productpriceId => {
  try {
    const productprice = await ProductPrice.findById(productpriceId);
    return transformProductPrice(productprice);
  } catch (err) {
    throw err;
  }
};

const transformPriceList = pricelist => {
  return {
    ...pricelist._doc,
    _id: pricelist.id,
    productId: product.bind(this, pricelist._doc.product),
    productpriceId: productprice.bind(this, pricelist._doc.productprice),
  }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformProduct = transformProduct;
exports.transformCategory = transformCategory;
exports.transformGender = transformGender;
exports.transformManufacturer = transformManufacturer;
exports.transformProductPrice = transformProductPrice;
exports.transformPriceList = transformPriceList;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
