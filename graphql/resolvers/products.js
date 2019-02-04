const Product = require('../../models/product');
const Manufacturer = require('../../models/manufacturer');
const Category = require('../../models/category');
const Gender = require('../../models/gender');
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
    const fetchedCategory = await Category.findOne({_id: args.productInput.category });
    const fetchedManufacturer = await Manufacturer.findOne({_id: args.productInput.manufacturer });
    const fetchedGender = await Gender.findOne({_id: args.productInput.gender });
    const product = new Product({
      name: args.productInput.name,
      category: fetchedCategory,
      gender: fetchedGender,
      manufacturer: fetchedManufacturer,
      price: +args.productInput.price,
      creator: req.userId
    });
    console.log("Created product: " + product);
    let createdProduct;
    try {
      
      const result = await product.save();
      console.log("Transformed product: " + result);
      createdProduct = transformProduct(result);
      const creator = await User.findById(req.userId);
      console.log("Creator::::::::::::::::::::::::: " + result);
      if (!creator) {
        throw new Error('User not found.');
      }
      console.log(creator);
      console.log(createdProduct);
      creator.createdProducts.push(product);
      await creator.save();

      return createdProduct;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
