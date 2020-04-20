const configValues = require('./config');

module.exports = {
  getDbConnectionConfig() {
    return {
      user: `${configValues.database.user}`,
      host: `${configValues.database.host}`,
      database: `${configValues.database.database}`,
      password: `${configValues.database.password}`,
      port: `${configValues.database.port}`,
    };
  },

  getPort() {
    return configValues.port;
  },

};
