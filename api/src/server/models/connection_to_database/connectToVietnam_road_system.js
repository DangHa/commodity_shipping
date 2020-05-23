const Pool = require('pg').Pool
const config = require('../../config');
const pool = new Pool(config.getDbConnectionConfig());


module.exports = pool;