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
  },

  async signup(Phone, Password) {
    try{
      query = `INSERT INTO public."User"(phone, password)
        VALUES ('${Phone}', '${Password}')`;
              
      var result = await pool.query(query);
      
      // check whether have any account have the same phone
      // console.log(result)
      return true

    }catch(e){}
  }

};
