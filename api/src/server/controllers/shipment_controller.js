const shipmentTable = require('../models/shipmentTable')
const driverTable = require('../models/driverTable')
const packageTable = require('../models/packageTable')
const routeTable = require('../models/routeTable')

module.exports = {

  async getSuggestedShipment(req, res) {
    const Phone = req.body.phone;

    // need a algoritm for suggesting shipment and reckon the expense

    let result = await shipmentTable.getSuggestedShipment(Phone)

    // calculate the price 
    for (var i = 0; i < result.length; i++) {
      result[i]["price"] = "100"
    }

    response = JSON.stringify(result)
    res.send(response);
  },

  async getShipmentDetail(req, res) {
    const shipment_id = req.body.shipment_id;
    
    const result = await shipmentTable.getShipmentDetail(shipment_id);

    res.send(result);
  },

  async getShipmentsByDriver(req, res) {
    const Phone = req.body.phone;
    
    const driver = await driverTable.findDriverByPhone(Phone)

    driver_id = driver[0].driver_id
    const result = await shipmentTable.getShipmentsByDriver(driver_id);

    for (var i = 0; i<result.length; i++){
      result[i]["numberOfWaiter"] = await packageTable.getWaitingPackageByShipment(result[i].shipment_id);
    }
    
    res.send(result);
  },

  async createNewShipment(req, res) {
    const Phone     = req.body.phone
    const driver    = await driverTable.findDriverByPhone(Phone)
    const driver_id = driver[0].driver_id

    const typeOfCar_id             = req.body.typeOfCar_id;
    const startingDate             = req.body.startingDate;
    const weightCapacity           = req.body.weightCapacity;
    const spaceCapacity            = req.body.spaceCapacity;

    const startingPointName        = req.body.startingPointName;
    const latitute_starting_point  = req.body.latitute_starting_point;
    const longitude_starting_point = req.body.longitude_starting_point;
    const destinationName          = req.body.destinationName;
    const latitude_destination     = req.body.latitude_destination;
    const longitude_destination    = req.body.longitude_destination;
    const roadDescription          = req.body.roadDescription;
    const length                   = req.body.length;

    //create route
    const routeResult = await routeTable.createNewRoute(
                                        startingPointName,
                                        latitute_starting_point,
                                        longitude_starting_point,
                                        destinationName,
                                        latitude_destination,
                                        longitude_destination,
                                        roadDescription,
                                        length)

    //create shipment
    const BOT_fee = 200
    const fee = length*11 + BOT_fee //11 is price of 1 liter of gasoline
    const shipmentResult = await shipmentTable.createNewShipment(
                                        driver_id,
                                        typeOfCar_id,
                                        route_id,
                                        startingDate,
                                        weightCapacity,
                                        spaceCapacity,
                                        fee)

    //create PassedBOT
    
    res.send(JSON.stringify(shipmentResult));
  
  },
  
};