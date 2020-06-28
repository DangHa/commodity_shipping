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
      if (result[0].status === "deleted") {
        response = JSON.stringify("This account has been deleted")
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
    
    const result = await driverTable.findDriverByPhone(Phone);
    res.send(JSON.stringify(result));
  },

  async getAllDrivers(req, res) {
    try {
      const result = await driverTable.getAllDrivers();

      res.send(result);
    }catch(e){
      console.log(e)
    }

  },

  async deleteDriver(req, res) {
    const driver_id = req.body.driver_id;
    
    const result = await driverTable.deleteDriver(driver_id);
    
    res.send(JSON.stringify(result));
  },
  
  async updateInforDriver(req, res) {
    const OldPhone = req.body.oldPhone;
    const Phone = req.body.phone;
    const Username = req.body.username;
    const Address = req.body.address;
    
    var result = []
    if (OldPhone !== Phone){
        result = await driverTable.findDriverByPhone(Phone)
    }
    
    if (result.length !== 0) {
        res.send(JSON.stringify("New phone number has already been registed for another account"))
    }else{
        result = await driverTable.updateInforDriver(OldPhone, Phone, Username, Address)
        res.send(JSON.stringify(true))
    }
  },
};
