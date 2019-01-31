const Gender = require('../../models/gender');
const User = require('../../models/user');

const { transformGender } = require('./merge');

module.exports = {
  genders: async () => {
    try {
      const genders = await Gender.find();
      return genders.map(gender => {
        return transformGender(gender);
      });
    } catch (err) {
      throw err;
    }
  },
  createGender: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const gender = new Gender({
      name: args.genderInput.name
    });
    console.log(gender);
    let createdGender;
    try {
      const result = await gender.save();
      createdGender = transformGender(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdGender.push(gender);
      await creator.save();
      return createdGender;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
