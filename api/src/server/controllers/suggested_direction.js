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
    
    res.send([true]);
  },
}