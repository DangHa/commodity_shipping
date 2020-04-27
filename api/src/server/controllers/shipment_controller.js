const shipmentTable = require('../models/tables/shipmentTable')

module.exports = {

  async getSuggestedShipment(req, res) {
    const Phone = req.body.phone;
    
    let result = await shipmentTable.getSuggestedShipment(Phone)

    response = JSON.stringify(result)
    res.send(response);
  },

  async getShipmentDetail(req, res) {
    const package_id = req.body.package_id;
    
    const result = await shipmentTable.getShipmentDetail(package_id);
    res.send(result);
  },
  
};
