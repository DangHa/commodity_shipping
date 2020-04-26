const packageQuery = require('../../models/tables/packageQuery');

module.exports = {

  async getPackageByPhone(req, res) {
    const Phone = req.body.phone;
    
    const result = await packageQuery.getPackageByPhone(Phone);
    res.send(result);
  },

  async getPackageDetail(req, res) {
    const package_id = req.body.package_id;
    
    const result = await packageQuery.getPackageDetail(package_id);
    res.send(result);
  },
  
};
