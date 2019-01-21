const Category = require('../../models/category');
const User = require('../../models/user');

const { transformCategory } = require('./merge');

module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const category = new Category({
      name: args.categoryInput.title,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformCategory(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
