const userServices = require('../../models/tables/userQuery');

module.exports = {

  async getUsers(req, res) {
    // you must wait in here because test of model is waitting OI database
    try {
      const result = await userServices.getUser();

      res.send(result);
    }catch(e){
      console.log(e)
    }

  },

  // will be fixed on tomorrow
  async setDatabase() {
    await userServices.setupUser();
  },

  async login(req, res) {
    const Username = req.body.username;
    const Password = req.body.password;

    const result = await userServices.login(Username, Password);

    res.send(result);
  },

};
