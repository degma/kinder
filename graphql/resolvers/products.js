const Product = require('../../models/product');
const Manufacturer = require('../../models/manufacturer');
const Category = require('../../models/category');
const Gender = require('../../models/gender');
const User = require('../../models/user');
const ProductPrice = require('../../models/productprice');
const PriceList = require('../../models/priceList');

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
    // const fetchedCategory = await Category.findOne({_id: args.productInput.categoryId });
    const fetchedCategory = await Category.find({ _id: { $in: args.productInput.categoryId } });
    const fetchedManufacturer = await Manufacturer.findOne({_id: args.productInput.manufacturerId });
    // const fetchedGender = await Gender.findOne({_id: args.productInput.genderId });
    const fetchedGender = await Gender.find({ _id: { $in: args.productInput.genderId } });
    const fetchedPriceList = await PriceList.findOne({_id: args.productInput.pricelistId})
    
    const product = new Product({
      name: args.productInput.name,
      categoryId: fetchedCategory,
      genderId: fetchedGender,
      manufacturerId: fetchedManufacturer,
      description: args.productInput.description,
      creator: req.userId
    });
    
    const price = new ProductPrice({
      productId: product._id,
      pricelistId: args.productInput.pricelistId,
      price: args.productInput.price,
    });
        
    let createdProduct;
    try {
      await price.save();
      product.productprice.push(price);
      const result = await product.save();
      fetchedPriceList.prodprices.push(price);
      await fetchedPriceList.save();
      createdProduct = transformProduct(result);
      const creator = await User.findById(req.userId);
      
      if (!creator) {
        throw new Error('User not found.');
      }
      
      creator.createdProducts.push(product);
      await creator.save();

      return createdProduct;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
