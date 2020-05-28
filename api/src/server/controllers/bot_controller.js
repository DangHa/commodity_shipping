const botQuery = require('../models/botTables');

module.exports = {

  async getFeeAndBOTPassed(req, res) {
    const typeOfCar_id = req.body.typeOfCar_id;
    const roadDescription = req.body.roadDescription;
    const length = req.body.length;

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

          if (Math.abs(check_lon) > 0.02 && Math.abs(check_lat) > 0.02){
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

    // getting price of each toll plaza
    var fee = 0
    var passedExpressed_Way = []
    
    var expressway_passed = ""
    var start_toll = 0 //
    for (var i = 0; i < passedBOT.length; i++){

      if (expressway_passed === "") {
        expressway_passed = passedBOT[i].expressway_name
        start_toll = i //get the first toll plaza
      }else{
        if (passedBOT[i].expressway_name !== expressway_passed){

          var result = null
          //find the end toll plaza in this expresway have a relationship with the first toll plaza
          for (var j = i-1;j >= start_toll; j--){
  
            if (result === null){
              const result = await botQuery.find_toll_plaze_price(passedBOT[start_toll].toll_plaza_id, passedBOT[j].toll_plaza_id, typeOfCar_id);

              if (result.length !== 0){
                fee += result[0].price

                passedExpressed_Way.push({
                  start_toll: passedBOT[start_toll],
                  end_toll  : passedBOT[j],
                  fee       : result[0].price
                })
                break
              }

            }
          }

          // the next first toll plaza
          expressway_passed = passedBOT[i].expressway_name
          start_toll = i
        }

        // end of array
        if (i === passedBOT.length-1){
          
          var result = null
          //find the end toll plaza in this expresway have a relationship with the first toll plaza
          for (var j = i;j >= start_toll; j--){

            if (result === null){
              const result = await botQuery.find_toll_plaze_price(passedBOT[start_toll].toll_plaza_id, passedBOT[j].toll_plaza_id, typeOfCar_id);

              if (result.length !== 0){
                fee += result[0].price

                passedExpressed_Way.push({
                  start_toll: passedBOT[start_toll],
                  end_toll  : passedBOT[j],
                  fee       : result[0].price
                })
                break
              }

            }
          }
        }

      }

    }

    console.log(passedExpressed_Way)

    fee += length/100*10 * 15
    // passedBOT = ["something"]
    var response = {
        fee: parseInt(fee),
        passedBOT: passedExpressed_Way
    }
    res.send(response);
  },

  //for admin 
  async getAllBOT(req, res) {
    try {
      const result = await botQuery.getAllBOT();

      var response = [] //[{expressway, []]
      var expressway = []
      for (var i = 0; i < result.length; i++){
        if (!expressway.includes(result[i].expressway)){
          expressway.push(result[i].expressway)
          response.push({
            expressway: result[i].expressway,
            details   : [result[i]]
          })
        }else{
          response[response.length-1].details.push(result[i])          
        }
      }

      console.log(response[0])

      res.send(response);
    }catch(e){
      console.log(e)
    }
  }

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