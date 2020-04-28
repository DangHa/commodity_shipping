const packageTable = require('../models/packageTable');

module.exports = {

  async getPackageByPhone(req, res) {
    const Phone = req.body.phone;
    
    const result = await packageTable.getPackageByPhone(Phone)
     
    res.send(JSON.stringify(result));
  },

  async getPackageDetail(req, res) {
    const package_id = req.body.package_id;
    
    const result = await packageTable.getPackageDetail(package_id);
    res.send(JSON.stringify(result));
  },
  
};
