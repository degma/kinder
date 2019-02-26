// const Event = require('../../models/event');
const PriceList = require('../../models/priceList');
const ProductPrice = require('../../models/productprice');
const Product = require('../../models/product');
const User = require('../../models/user');
const Category = require('../../models/category');
const Gender = require('../../models/gender');
const Manufacturer = require('../../models/manufacturer');
const { dateToString } = require('../../helpers/date');


// const events = async eventIds => {
//   try {
//     const events = await Event.find({ _id: { $in: eventIds } });
//     return events.map(event => {
//       return transformEvent(event);
//     });
//   } catch (err) {
//     throw err;
//   }
// };

// const singleEvent = async eventId => {
//   try {
//     const event = await Event.findById(eventId);
//     return transformEvent(event);
//   } catch (err) {
//     throw err;
//   }
// };

// const transformEvent = event => {
//   return {
//     ...event._doc,
//     _id: event.id,
//     date: dateToString(event._doc.date),
//     creator: user.bind(this, event.creator)
//   };
// };

const product = async productId => {
  try {
    const product = await Product.findById(productId);
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


// const gender = async genderId => {
//   try {
//     const gender = await Gender.findById(genderId);
//     return {
//       ...gender._doc,
//       _id: gender.id,
//     };
//   } catch (err) {
//     throw err;
//   }
// };

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

// const category = async categoryId => {
//   try {
//     const category = await Category.findById(categoryId);
//     return {
//       ...category._doc,
//       _id: category.id,
//     };
//   } catch (err) {
//     throw err;
//   }
// };

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
    genderId: genders.bind(this, product._doc.genderId),
    manufacturerId: manufacturer.bind(this, product.manufacturerId),
    categoryId: categories.bind(this, product._doc.categoryId),
    productprice: productprices.bind(this, product._doc.productprice),
    creator: user.bind(this, product.creator),
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

const categories = async categoryIds => {
  try {
    const categories = await Category.find({ _id: { $in: categoryIds } });
    return categories.map(category => {
      return transformCategory(category);
    });
  } catch (err) {
    throw err;
  }
};

const genders = async genderIds => {
  try {
    const genders = await Gender.find({ _id: { $in: genderIds } });
    return genders.map(gender => {
      return transformGender(gender);
    });
  } catch (err) {
    throw err;
  }
};


const productprices = async productpriceIds => {
  try {
    const productprices = await ProductPrice.find({ _id: { $in: productpriceIds } });
    return productprices.map(prodprice => {
      return transformProductPrice(prodprice);
    });
  } catch (err) {
    throw err;
  }
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


const transformPriceList = pricelist => {
  console.log("Transformed PRICE LIST");
  console.log(...pricelist.id);
  return {
    ...pricelist._doc,
    _id: pricelist.id,
    prodprices: productprices.bind(this, pricelist.prodprices)

  }
};

exports.transformProduct = transformProduct;
exports.transformCategory = transformCategory;
exports.transformGender = transformGender;
exports.transformManufacturer = transformManufacturer;
exports.transformProductPrice = transformProductPrice;
exports.transformPriceList = transformPriceList;

// exports.transformEvent = transformEvent;
// exports.transformBooking = transformBooking;
// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
