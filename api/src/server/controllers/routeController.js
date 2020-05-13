const packageTable = require('../models/packageTable');
const routeQuery = require('../models/routeTable');

module.exports = {

  async getFeeAndBOTPassed(req, res) {
    const typeOfCar_id = req.body.typeOfCar_id;
    const roadDescription = req.body.roadDescription;

    // const result = await routeQuery.getBOTroad();

    const fee = 200
    const passedBOT = ["something"]
    result = {
        fee: fee,
        passedBOT: passedBOT
    }
    res.send(result);
  },
  
};
