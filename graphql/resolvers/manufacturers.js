const Manufacturer = require('../../models/manufacturer');
const User = require('../../models/user');

const { transformManufacturer } = require('./merge');

module.exports = {
  manufacturers: async () => {
    try {
      const manus = await Manufacturer.find();
      return manus.map(manu => {
        return transformManufacturer(manu);
      });
    } catch (err) {
      throw err;
    }
  },
  createManufacturer: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const manu = new Manufacturer({
      name: args.manufacturerInput.name,
      address: args.manufacturerInput.address,
      phone: args.manufacturerInput.phone,
      primary_contact_name: args.manufacturerInput.primary_contact_name, 
      primary_contact_phone: args.manufacturerInput.primary_contact_phone,
      creator: req.userId


    });
    console.log(manu);
    let createdManu;
    try {
      const result = await manu.save();
      createdManu = transformManufacturer(result);
      // const creator = await User.findById(req.userId);

      // if (!creator) {
      //   throw new Error('User not found.');
      // }
      // creator.createdManu.push(manu);
      // await creator.save();
      return createdManu;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
