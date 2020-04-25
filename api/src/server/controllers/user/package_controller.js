const packageQuery = require('../../models/tables/packageQuery');

module.exports = {

  async getPackageByPhone(req, res) {
    const Phone = req.body.phone;
    
    const result = await packageQuery.getPackageByPhone(Phone);
    console.log(result)
    res.send(result);
  },
  
};
