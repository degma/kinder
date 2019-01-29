const Category = require('../../models/category');
const User = require('../../models/user');

const { transformCategory } = require('./merge');

module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return categories.map(category => {
        return transformCategory(category);
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const category = new Category({
      name: args.categoryInput.name,
      creator: req.userId
    });
    console.log(category);
    let createdCategory;
    try {
      const result = await category.save();
      createdCategory = transformCategory(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdCategory.push(category);
      await creator.save();
      return createdCategory;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
