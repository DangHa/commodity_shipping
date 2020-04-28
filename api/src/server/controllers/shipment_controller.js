const shipmentTable = require('../models/shipmentTable')

module.exports = {

  async getSuggestedShipment(req, res) {
    const Phone = req.body.phone;

    // need a algoritm for suggesting shipment and reckon the expense

    let result = await shipmentTable.getSuggestedShipment(Phone)

    response = JSON.stringify(result)
    res.send(response);
  },

  async getShipmentDetail(req, res) {
    const shipment_id = req.body.shipment_id;
    
    const result = await shipmentTable.getShipmentDetail(shipment_id);

    res.send(result);
  },
  
};
