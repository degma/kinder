const Product = require('../../models/product');
const User = require('../../models/user');

const { transformProduct } = require('./merge');

module.exports = {
  products: async () => {
    try {
      const products = await Product.find();
      return products.map(product => {
        return transformProduct(product);
      });
    } catch (err) {
      throw err;
    }
  },
  createProduct: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const product = new Product({
      name: args.productInput.name,
      category: args.productInput.category,
      gender: args.productInput.gender,
      manufacturer: args.productInput.manufacturer,
      price: +args.productInput.price,
      creator: req.userId
    });
    console.log(product);
    let createdProduct;
    try {
      
      const result = await product.save();
      createdProduct = transformProduct(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdProduct.push(event);
      await creator.save();

      return createdProduct;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
