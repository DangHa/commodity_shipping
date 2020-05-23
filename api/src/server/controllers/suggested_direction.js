const suggestedDirection = require('../models/suggested_direction')
const botQuery = require('../models/botTables');

module.exports = {

  async getSuggestedDirection(req, res) {
    const starting_point = req.body.starting_point;
    const destination    = req.body.destination;
    const weight         = req.body.weight_BOT;

    console.log(starting_point);
    console.log(destination);
    console.log(weight);
    
    res.send([true]);
  },
}