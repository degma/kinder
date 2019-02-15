const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const productResolver = require('./products');
const categoryResolver = require('./categories');
const genderResolver = require('./genders');
const manufaturerResolver = require('./manufacturers');
const producpriceResolver = require('./productprices');
const pricelistResolver = require('./pricelists');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...productResolver,
  ...categoryResolver,
  ...genderResolver,
  ...manufaturerResolver,
  ...pricelistResolver ,
  ...producpriceResolver,
};

module.exports = rootResolver;
