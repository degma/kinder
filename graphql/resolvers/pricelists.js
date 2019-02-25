const PriceList = require('../../models/priceList');
const User = require('../../models/user');

const { transformPriceList } = require('./merge');

module.exports = {
  
  pricelists: async () => {
    try {
      const pricelists = await PriceList.find();
      return pricelists.map(pricelist => {
        return transformPriceList(pricelist);
      });
    } catch (err) {
      throw err;
    }
  },
  currentPriceList: async () => {
    try{
      const pricelist = await PriceList.findOne({ status: "active"});
      return transformPriceList(pricelist);
    } catch (err) {
      throw err;
    }
  }
  ,
  createPriceList: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const pricelist = new PriceList({
      name: args.pricelistInput.name,
      validFrom: args.pricelistInput.validFrom,
      validTo: args.pricelistInput.validTo,
      status: args.pricelistInput.status,

    });
    console.log(pricelist);
    let createdPriceList;
    try {
      const result = await pricelist.save();
      createdPriceList = transformPriceList(result);
      const creator = await User.findById(req.userId);

      // if (!creator) {
      //   throw new Error('User not found.');
      // }
      // creator.createdManu.push(manu);
      // await creator.save();
      return createdPriceList;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
