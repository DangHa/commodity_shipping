const Pool = require('pg').Pool
const config = require('../../config');
const pool = new Pool(config.getConnectionConfig_UserDatabase());

module.exports = pool;