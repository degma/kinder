const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const productResolver = require('./products');
const categoryResolver = require('./categories');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...productResolver,
  ...categoryResolver
};

module.exports = rootResolver;
