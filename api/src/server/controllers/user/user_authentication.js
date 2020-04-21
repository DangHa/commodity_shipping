const userQuery = require('../../models/tables/userQuery');

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

  // will be fixed on tomorrow
  async setDatabase() {
    await userQuery.setupUser();
  },

  async login(req, res) {
    const Phone = req.body.username;
    const Password = req.body.password;

    const result = await userQuery.login(Phone, Password);

    res.send(result);
  },

};
