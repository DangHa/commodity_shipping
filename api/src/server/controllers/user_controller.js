const userQuery = require('../models/userQuery');

module.exports = {

  async getAllUsers(req, res) {
    try {
      const result = await userQuery.getAllUsers();

      res.send(result);
    }catch(e){
      console.log(e)
    }

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
    res.send(JSON.stringify(result));
  },
  
  async deleteUser(req, res) {
    const user_id = req.body.user_id;
    
    const result = await userQuery.deleteUser(user_id);
    res.send(JSON.stringify(result));
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
