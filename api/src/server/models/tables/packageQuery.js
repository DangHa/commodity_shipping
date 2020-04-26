const packageTable = require('./packageTable')

module.exports = {

  async getPackageByPhone(Phone) {
    result = await packageTable.getPackageByPhone(Phone)
    return JSON.stringify(result)
  },

  async getPackageDetail(package_id) {
    result = await packageTable.getPackageDetail(package_id)
    return JSON.stringify(result)
  }
};
