
const fetch = require('node-fetch');

module.exports = {

  async getAllUsers(req, res) {
    try {
      fetch('http://localhost:8080/admin/getAllUsers')
          .then(res => res.json())
          .then(json => {
            res.send(json);
          })
          .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }

  },

  async deleteUser(req, res) {
    try {
      const user_id = req.body.user_id;

      fetch('http://localhost:8080/admin/deleteUser', {
            method: 'post',
            body: JSON.stringify({
              user_id: user_id
            }),
            headers: { 'Content-type': 'application/json' }
          })
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

  async updateInforUser(req, res) {
    try {
      const OldPhone = req.body.oldPhone;
      const Phone    = req.body.phone;
      const Username = req.body.username;
      const Address  = req.body.address;

      fetch('http://localhost:8080/admin/updateInforUser', {
            method: 'post',
            body: JSON.stringify({
              oldPhone: OldPhone,
              phone   : Phone,
              username: Username,
              address : Address,
            }),
            headers: { 'Content-type': 'application/json' }
          })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          res.send(JSON.stringify({json}));
        })
        .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }
  },
};
