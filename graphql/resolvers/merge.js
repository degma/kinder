const Event = require('../../models/event');
const User = require('../../models/user');
const Category = require('../../models/category');
const Product = require('../../models/product');
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
    creator: user.bind(this, product.creator)
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

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformProduct = transformProduct;
exports.transformCategory = transformCategory;
exports.transformGender = transformGender;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
