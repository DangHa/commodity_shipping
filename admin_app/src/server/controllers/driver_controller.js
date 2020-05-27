
const fetch = require('node-fetch');

module.exports = {

  async getAllDrivers(req, res) {
    try {
      fetch('http://localhost:8080/admin/getAllDrivers')
          .then(res => res.json())
          .then(json => {
            res.send(json);
          })
          .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }

  },

  async deleteDriver(req, res) {
    try {
      const driver_id = req.body.driver_id;

      fetch('http://localhost:8080/admin/deleteDriver', {
            method: 'post',
            body: JSON.stringify({
                driver_id: driver_id
            }),
            headers: { 'Content-type': 'application/json' }
          })
        .then(res => res.json())
        .then(json => {
          res.send(json);
        })
        .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }
  },

  async updateInforDriver(req, res) {
    try {
      const OldPhone = req.body.oldPhone;
      const Phone    = req.body.phone;
      const Username = req.body.username;
      const Address  = req.body.address;

      fetch('http://localhost:8080/admin/updateInforDriver', {
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
          res.send(JSON.stringify({json}));
        })
        .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }
  },
};
