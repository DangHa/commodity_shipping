const configValues = require('./config');

module.exports = {
  getPort() {
    return configValues.port;
  },

};
