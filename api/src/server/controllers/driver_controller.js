const driverTable = require('../models/driverTable');

module.exports = {

  async login(req, res) {
    const Phone = req.body.phone;
    const Password = req.body.password;

    var result = await driverTable.findDriverByPhone(Phone)

    var response = JSON.stringify(false)
    if (result.length !== 0){
      if (result[0].password === Password) {
            response = JSON.stringify(true)
      }
    }else{
        response = JSON.stringify("This phone doesn't have any account")
    }

    res.send(response);
  },

  async signup(req, res) {
    const Phone = req.body.phone;
    const Password = req.body.password;
    
    var result = await driverTable.findDriverByPhone(Phone);

    var response = JSON.stringify(false)
    if (result.length === 0) {
        await driverTable.insertDriver(Phone, Password)
        response = JSON.stringify(true)
    }
    res.send(response);
  },

  async getInfoDriver(req, res) {
    const Phone = req.body.phone;
    
    const result = await driverTable.getInfoUser(Phone);
    res.send(JSON.stringify(result));
  },
  
  async updateInforDriver(req, res) {
    const OldPhone = req.body.oldPhone;
    const Phone = req.body.phone;
    const Username = req.body.username;
    const Address = req.body.address;
    
    const result = await driverTable.updateInforUser(OldPhone, Phone, Username, Address);
    res.send(result);
  },
};
