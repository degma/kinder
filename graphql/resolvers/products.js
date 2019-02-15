const Product = require('../../models/product');
const Manufacturer = require('../../models/manufacturer');
const Category = require('../../models/category');
const Gender = require('../../models/gender');
const User = require('../../models/user');
const ProductPrice = require('../../models/productprice');

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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const fetchedCategory = await Category.findOne({_id: args.productInput.categoryId });
    const fetchedManufacturer = await Manufacturer.findOne({_id: args.productInput.manufacturerId });
    const fetchedGender = await Gender.findOne({_id: args.productInput.genderId });
    
    const product = new Product({
      name: args.productInput.name,
      price: args.productInput.price,
      categoryId: fetchedCategory,
      genderId: fetchedGender,
      manufacturerId: fetchedManufacturer,
      creator: "5c45e81816f9cf4db8e33bb4" //req.userId
    });
    
    const price = new ProductPrice({
      productId: product._id,
      pricelistId: args.productInput.pricelistId,
      price: args.productInput.price,
    });
    
    console.log("Created product: " + product);
    
    
    let createdProduct;
    try {
      
      const resultprice = await price.save(); 
      const result = await product.save();
      console.log("Transformed product: " + product._id);      
      createdProduct = transformProduct(result);
      product.productprice.push(price);
      await product.save();

      const creator = await User.findById("5c45e81816f9cf4db8e33bb4");
      // const creator = await User.findById(req.userId);
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
