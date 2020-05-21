const shipmentTable = require('../models/shipmentTable')
const driverTable = require('../models/driverTable')
const packageTable = require('../models/packageTable')
const routeTable = require('../models/routeTable')
const botQuery = require('../models/botTables');

module.exports = {

  async getSuggestedShipment(req, res) {
    const latitute_starting_point  = req.body.latitute_starting_point;
    const longitude_starting_point = req.body.longitude_starting_point;
    const latitude_destination     = req.body.latitude_destination;
    const longitude_destination    = req.body.longitude_destination;
    const weight                   = req.body.weight;
    const space                    = req.body.space;

    // the first two criteria (weight, space)
    let result = await shipmentTable.getSuggestedShipment(weight, space)

    // use coordinate
    // step 1: get the total of distance between start and end point to the road through the waypoint of road description
    // step 2: sort result by distance
    // stop 3: get top 5 roads which have the shorest distance

    var distance = []
    for (var i = 0; i < result.length; i++) {
      var roadDescription = changeRoadDescriptionToObject(result[i].roaddescription)
      
      var shorest_distance_starting = 10000
      var shorest_distance_endding = 10000
      for (var j = 0; j < roadDescription.length; j++){
        var newDistance_starting = Math.pow((roadDescription[j].latitude - latitute_starting_point), 2) + Math.pow((roadDescription[j].longitude - longitude_starting_point), 2)
        var newDistance_end = Math.pow((roadDescription[j].latitude - latitude_destination), 2) + Math.pow((roadDescription[j].longitude - longitude_destination), 2)
        
        if (shorest_distance_starting > newDistance_starting) {
          shorest_distance_starting = newDistance_starting
        }

        if (shorest_distance_endding > newDistance_end) {
          shorest_distance_endding = newDistance_end
        }
      }
      distance.push(shorest_distance_starting + shorest_distance_endding)
    }

    // sort
    for (var i = 0; i < distance.length; i++) {
      for (var j = 0; j < distance.length; j++) {
        if(distance[i] < distance[j]){
          var temp = distance[i]
          distance[i] = distance[j]
          distance[j] = temp 

          temp = result[i]
          result[i] = result[j]
          result[j] = temp 
        }
      }
    }

    //get top 5
    if (result.length > 5) {
      result = result.slice(0, 5)
    }
    
    // calculate the price to create ranking of the last 5 shipments
    // price = moneyOfCar1*typeOfCar + length/100*moneyOf100Km + moneyOf1Kg*weight + space*moneyOf1M3
    var moneyOfCar1 = 2
    var moneyOf100Km = 5
    var moneyOf1Kg = 2
    var moneyOf1M3 = 2

    for (var i = 0; i < result.length; i++) {
      result[i]["price"] = moneyOfCar1*result[i].typeofcar_id + result[i].length/100*moneyOf100Km + moneyOf1Kg*weight + moneyOf1M3*space
      delete result[i].length
      delete result[i].typeofcar_id
    }

    //sort 
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < result.length; j++) {
        if(result[i]["price"] < result[j]["price"]){
          var temp = result[i]["price"]
          result[i]["price"] = result[j]["price"]
          result[j]["price"] = temp 
        }
      }
    }

    console.log(result)
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
    const fee                      = req.body.fee;
    const passedBOT                = req.body.passedBOT

    //create route
    const routeResult = await routeTable.createNewRoute(
                                        startingPointName,
                                        latitute_starting_point,
                                        longitude_starting_point,
                                        destinationName,
                                        latitude_destination,
                                        longitude_destination,
                                        changeRoadDescriptionToString(roadDescription),
                                        length)

    var route_id = 1                        
    if (routeResult.rows.length !== 0) {
      route_id = routeResult.rows[0].route_id
    }else{
      res.send(JSON.stringify(false));
    }
    
    //create PassedBOT
    for (var i = 0; i < passedBOT.length; i++){
      var toll_plaza_id_start = passedBOT[i].start_toll.toll_plaza_id
      var toll_plaza_id_end   = passedBOT[i].end_toll.toll_plaza_id

      const routeResult = await botQuery.CreatePassedBOT(
                                        route_id,
                                        typeOfCar_id,
                                        toll_plaza_id_start,
                                        toll_plaza_id_end)
    }

    //create shipment
    const shipmentResult = await shipmentTable.createNewShipment(
                                        driver_id,
                                        typeOfCar_id,
                                        route_id,
                                        startingDate,
                                        weightCapacity,
                                        spaceCapacity,
                                        fee)

    res.send(JSON.stringify(true));
  },
  
};


// [{lat1, lon1}, {lat2, lon2}]  -->  lat1 lon1 lat2 lon2
function changeRoadDescriptionToString(roadDescription){
  result = ""
  for (var i =0; i<roadDescription.length;i++) {
    result += " " + roadDescription[i].latitude + " "
    result += roadDescription[i].longitude
  }
  return result.slice(1)
}

// lat1 lon1 lat2 lon2  -->  [{lat1, lon1}, {lat2, lon2}]
function changeRoadDescriptionToObject(roadDescription) {
  var array = roadDescription.split(" ");

  var result = [];
  for (var i = 0; i < array.length-1; i+=2) {
    var newEle = {latitude: array[i], longitude: array[i+1]}
    result.push(newEle)
  };
  return result
}