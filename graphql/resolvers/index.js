const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const productResolver = require('./products');
const categoryResolver = require('./categories');
const genderResolver = require('./genders');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...productResolver,
  ...categoryResolver,
  ...genderResolver
};

module.exports = rootResolver;
