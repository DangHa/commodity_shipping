const pool = require('../connectToPostgreSQL')

module.exports = {
  async getUser() {
    try{
      var result = await pool.query('select * from public."Driver"');
      return result.rows
    }catch(e){}
  }

};
