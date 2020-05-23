const configValues = require('./config');

module.exports = {
  getConnectionConfig_UserDatabase() {
    return {
      user: `${configValues.user_database.user}`,
      host: `${configValues.user_database.host}`,
      database: `${configValues.user_database.database}`,
      password: `${configValues.user_database.password}`,
      port: `${configValues.user_database.port}`,
    };
  },

  getConnectionConfig_VietnamRoadSystem() {
    return {
      user: `${configValues.vietnam_road_system.user}`,
      host: `${configValues.vietnam_road_system.host}`,
      database: `${configValues.vietnam_road_system.database}`,
      password: `${configValues.vietnam_road_system.password}`,
      port: `${configValues.vietnam_road_system.port}`,
    };
  },

  getPort() {
    return configValues.port;
  },

};
