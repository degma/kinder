const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const productResolver = require('./products');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...productResolver
};

module.exports = rootResolver;
