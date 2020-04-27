const userQuery = require('../models/tables/userQuery');

module.exports = {

  async getAllUsers(req, res) {
    // you must wait in here because test of model is waitting OI database
    try {
      const result = await userQuery.getAllUsers();

      res.send(result);
    }catch(e){
      console.log(e)
    }

  },

  // will be fixed
  async setDatabase() {
    await userQuery.setupUser();
  },

  async login(req, res) {
    const Phone = req.body.phone;
    const Password = req.body.password;

    const result = await userQuery.login(Phone, Password);

    res.send(result);
  },

  async signup(req, res) {
    const Phone = req.body.phone;
    const Password = req.body.password;
    
    const result = await userQuery.signup(Phone, Password);
    res.send(result);
  },

  async getInfoUser(req, res) {
    const Phone = req.body.phone;
    
    const result = await userQuery.getInfoUser(Phone);
    res.send(result);
  },
  
  async updateInforUser(req, res) {
    const OldPhone = req.body.oldPhone;
    const Phone = req.body.phone;
    const Username = req.body.username;
    const Address = req.body.address;
    
    const result = await userQuery.updateInforUser(OldPhone, Phone, Username, Address);
    res.send(result);
  },
};
