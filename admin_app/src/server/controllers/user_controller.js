
const fetch = require('node-fetch');

module.exports = {

  async getAllUsers(req, res) {
    try {
      fetch('http://localhost:8080/admin/getAllUsers')
          .then(res => res.json())
          .then(json => {
            console.log(json)
            res.send(json);
          })
          .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }

  },

  // async login(req, res) {
  //   const Phone = req.body.phone;
  //   const Password = req.body.password;

  //   const result = await userQuery.login(Phone, Password);

  //   res.send(result);
  // },

  // async updateInforUser(req, res) {
  //   const OldPhone = req.body.oldPhone;
  //   const Phone = req.body.phone;
  //   const Username = req.body.username;
  //   const Address = req.body.address;
    
  //   const result = await userQuery.updateInforUser(OldPhone, Phone, Username, Address);
  //   res.send(result);
  // },
};
