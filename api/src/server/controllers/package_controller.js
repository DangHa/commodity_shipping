const packageTable = require('../models/packageTable');
const userQuery = require('../models/userQuery');

module.exports = {

  async createNewPackage(req, res) {
    const shipment_id              = req.body.shipment_id;
    const userphone                = req.body.userphone;
    const startingPointName        = req.body.startingPointName;
    const latitute_starting_point  = req.body.latitute_starting_point;
    const longitude_starting_point = req.body.longitude_starting_point;
    const destinationName          = req.body.destinationName;
    const latitude_destination     = req.body.latitude_destination;
    const longitude_destination    = req.body.longitude_destination;
    const weight                   = req.body.weight;
    const space                    = req.body.space;
    const phoneOfReceiver          = req.body.phoneOfReceiver;
    const price                    = req.body.price;
    const package_id               = req.body.package_id;

    if (package_id !== null){
      const result = await packageTable.updatePackageShipment_id(package_id, shipment_id)
      res.send(JSON.stringify(result));
    }else{
      const userinfor = await userQuery.getInfoUser(userphone);

      const result = await packageTable.createNewPackage(
                                          userinfor[0].user_id,
                                          shipment_id,
                                          weight,
                                          space,
                                          price,
                                          startingPointName,
                                          latitute_starting_point,
                                          longitude_starting_point,
                                          destinationName,
                                          latitude_destination,
                                          longitude_destination,
                                          phoneOfReceiver)
      
      res.send(JSON.stringify(result));
    }
    
  },
  
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

  async getWaitingPackageByShipment(req, res) {
    const shipment_id = req.body.shipment_id;

    const result = await packageTable.getWaitingPackageByShipment(shipment_id);

    res.send(result);
  },

  async getPackageByShipment(req, res) {
    const shipment_id = req.body.shipment_id;

    const result = await packageTable.getPackageByShipment(shipment_id);
    
    res.send(result);
  },

  async updatePackageStatus(req, res) {
    const package_id = req.body.package_id;
    const status = req.body.status;

    const result = await packageTable.updatePackageStatus(package_id, status);

    res.send(result);
  },
  
};
