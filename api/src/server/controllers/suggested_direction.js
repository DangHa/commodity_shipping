const shipmentTable = require('../models/shipmentTable')
const driverTable = require('../models/driverTable')
const packageTable = require('../models/packageTable')
const routeTable = require('../models/routeTable')
const botQuery = require('../models/botTables');

module.exports = {

  async getSuggestedDirection(req, res) {
    const starting_point = req.body.starting_point;
    const destination = req.body.destination;
    
    const driver = await driverTable.findDriverByPhone(Phone)

    driver_id = driver[0].driver_id
    const result = await shipmentTable.getShipmentsByDriver(driver_id);

    for (var i = 0; i<result.length; i++){
      result[i]["numberOfWaiter"] = await packageTable.getWaitingPackageByShipment(result[i].shipment_id);
    }
    
    res.send(result);
  },
}