const botQuery = require('../models/botTables');
const fetch = require("node-fetch");

const GOOGLE_MAP_APIKEY = 'AIzaSyDI3l4n3NL_KbvvLtO8DuSfl4mImgrANoM';

module.exports = {

  async getFeeAndBOTPassed(req, res) {
    const typeOfCar_id = req.body.typeOfCar_id;
    const roadDescription = req.body.roadDescription;
    const length = req.body.length;
    console.log("dadfdf ", roadDescription[0])

    var latStreet = []
    var lonStreet = []
    for (var i = 0; i < roadDescription.length; i+=1) {
      var lat = roadDescription[i].latitude
      var lon = roadDescription[i].longitude
      
      // Continue if 2 coordinate have the same lat and long
      if (latStreet.length > 0){
        if (latStreet[latStreet.length-1] !== lat || lonStreet[latStreet.length-1] !== lon) {
          
          // add more waypoints
          var check_lat = latStreet[latStreet.length-1]-lat
          var check_lon = lonStreet[lonStreet.length-1]-lon

          if (Math.abs(check_lon) > 0.03 && Math.abs(check_lat)>0.03){
            latStreet.push(latStreet[latStreet.length-1]-check_lat/4)
            lonStreet.push(lonStreet[lonStreet.length-1]-check_lon/4)

            latStreet.push(latStreet[latStreet.length-1]-check_lat*2/4)
            lonStreet.push(lonStreet[lonStreet.length-1]-check_lon*2/4)

            latStreet.push(latStreet[latStreet.length-1]-check_lat*3/4)
            lonStreet.push(lonStreet[lonStreet.length-1]-check_lon*3/4)
          }

          latStreet.push(lat)
          lonStreet.push(lon)
        }
      }else {
        latStreet.push(lat)
        lonStreet.push(lon)
      }
    }
    
    // get passedBOT
    var passedBOT = []
    var radius = 0.003 * length/100
    

    for (var i = 0; i< latStreet.length; i++) {

      const result = await botQuery.find_toll_plaze(latStreet[i], lonStreet[i], radius);

      if (result.length !== 0){
        passedBOT.push(result[0])
      }
      
    }

    passedBOT = remove_duplication(passedBOT)

    console.log(latStreet.length)
    console.log("radius: ", radius)
    console.log(passedBOT.length)
    console.log(passedBOT)

    // getting price of each toll plaza

    const fee = 200
    passedBOT = ["something"]
    result = {
        fee: fee,
        passedBOT: passedBOT
    }
    res.send(result);
  },
  
};

function remove_duplication(array) {
  var newArray = []

  for (var i = 0; i < array.length; i++) {
    var check = true
    for (var j = 0; j < newArray.length; j++) {
      if (array[i].toll_plaza_id === newArray[j].toll_plaza_id) {
        check = false
        break
      }
    }

    if (check === true) {
      newArray.push(array[i])
    }
  }

  return newArray
}