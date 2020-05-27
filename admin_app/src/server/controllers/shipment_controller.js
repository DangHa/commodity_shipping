const fetch = require('node-fetch');

module.exports = {

  async getAllShipments(req, res) {
    try {
      fetch('http://localhost:8080/admin/getAllShipments')
          .then(res => res.json())
          .then(json => {
            res.send(json);
          })
          .catch(err => console.log(err))

    }catch(e){
      console.log(e)
    }

  },

  async deleteShipment(req, res) {
    try {
      const shipment_id = req.body.shipment_id;

      fetch('http://localhost:8080/admin/deleteShipment', {
            method: 'post',
            body: JSON.stringify({
                shipment_id: shipment_id
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

};
