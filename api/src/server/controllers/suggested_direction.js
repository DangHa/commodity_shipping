const suggestedDirection = require('../models/suggested_direction')
const botQuery = require('../models/botTables');

module.exports = {

  async getSuggestedDirection(req, res) {
    const latitute_starting_point = req.body.latitute_starting_point;
    const longitude_starting_point= req.body.longitude_starting_point;
    const latitude_destination    = req.body.latitude_destination;
    const longitude_destination   = req.body.longitude_destination;
    const weight                  = req.body.weight_BOT;

    console.log("starting point: ", latitute_starting_point, ", ", longitude_starting_point);
    console.log("destination: ", latitude_destination, ", ", longitude_destination);
    console.log(weight);

    const result = await suggestedDirection.find_toll_plaze(
                                latitute_starting_point,
                                longitude_starting_point,
                                latitude_destination,
                                longitude_destination,
                                weight);
    
    // console.log(result)
    var response = []

    for( var i = 0; i < result.length; i++) {
      var osm_data_form_route = result[i].st_astext.slice(11, -1)

      var presented_road = changeOSMDataToPresentedData(osm_data_form_route)
      // get coordinate of route
      response = [...response, ...presented_road]
    }

    console.log(response[10])

    res.send(response);
  },
}

function changeOSMDataToPresentedData(osm_data_form_route) {
  var osm_array = osm_data_form_route.split(",")

  var result = []
  for (var i =0 ; i < osm_array.length; i++) {
    var one_point = osm_array[i].split(" ")

    result.push({
      latitude: parseFloat(one_point[1]),
      longitude: parseFloat(one_point[0])
    })
  }
  
  return result 
}