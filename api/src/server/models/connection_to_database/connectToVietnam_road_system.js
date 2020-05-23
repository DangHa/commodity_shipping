const Pool = require('pg').Pool
const config = require('../../config');
const pool = new Pool(config.getConnectionConfig_VietnamRoadSystem());

module.exports = pool;