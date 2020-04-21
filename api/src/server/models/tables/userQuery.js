const pool = require('../connectToPostgreSQL')

module.exports = {

  async getAllUsers() {
    try{
      var result = await pool.query('SELECT * FROM public."User"');
      return result.rows
    }catch(e){}
  },

  async login(Phone, Password) {
    try{
      query = `SELECT * FROM public."User" 
              WHERE phone = '${Phone}' AND password = '${Password}'`
              
      var result = await pool.query(query);
      
      if (result.rows.length !== 0){
        return true
      }else{
        return false
      }

    }catch(e){}
  }

};
