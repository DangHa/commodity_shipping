const packageTable = require('./packageTable')

module.exports = {

  async getPackageByPhone(Phone) {
    result = await packageTable.getPackageByPhone(Phone)
    return JSON.stringify(result)
  },

};
