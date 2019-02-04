const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const productResolver = require('./products');
const categoryResolver = require('./categories');
const genderResolver = require('./genders');
const manufaturerResolver = require('./manufacturers');
const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...productResolver,
  ...categoryResolver,
  ...genderResolver,
  ...manufaturerResolver
};

module.exports = rootResolver;
