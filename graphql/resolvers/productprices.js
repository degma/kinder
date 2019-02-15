const ProductPrice = require('../../models/productprice');
const User = require('../../models/user');

const { transformProductPrice } = require('./merge');

module.exports = {
  
  productprices: async ({pricelistId}) => {
    try {
      const productprices = await ProductPrice.find({pricelistId: pricelistId});
      console.log("Precioooooooooooooooooo"+productprices);
      return productprices.map(productprice => {
        return transformProductPrice(productprice);
      });
    } catch (err) {
      throw err;
    }
  },
  createProductPrice: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const productprice = new ProductPrice({
      productId: args.productpriceInput.productId,
      pricelistId: args.productpriceInput.pricelistId,
      price: args.productpriceInput.price,

    });
    console.log(productprice);
    let createdProductPrice;
    try {
      const result = await productprice.save();
      createdProductPrice = transformProductPrice(result);
      //const creator = await User.findById(req.userId);
      // if (!creator) {
      //   throw new Error('User not found.');
      // }
      // creator.createdManu.push(manu);
      // await creator.save();
      return createdProductPrice;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
