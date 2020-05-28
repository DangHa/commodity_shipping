
const fetch = require('node-fetch');

module.exports = {

  async statistic(req, res) {
    try {
      fetch('http://localhost:8080/admin/statistic')
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
