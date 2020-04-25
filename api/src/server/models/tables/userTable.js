const pool = require('../connectToPostgreSQL')

module.exports = {

  async getAllUsers() {
    try{
      var result = await pool.query('SELECT * FROM public."User"');
      return result.rows
    }catch(e){}
  },

  async findUserByPhone(Phone) {
    try{
      query = `SELECT * FROM public."User" 
              WHERE phone = '${Phone}'`
              
      var result = await pool.query(query);
      
      return result.rows

    }catch(e){}
  },

  async findUserByPhoneAndPassword(Phone, Password) {
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

  async insertUser(Phone, Password){
    try{
        query = `INSERT INTO public."User"(phone, password)
          VALUES ('${Phone}', '${Password}')`;
                
        var result = await pool.query(query);
    
        return true
  
    }catch(e){}
  },

  async updateInforUser(OldPhone, Phone, Username, Address){
    try{
        query = `UPDATE public."User"
            SET phone='${Phone}', username='${Username}', address='${Address}'
            WHERE phone = '${OldPhone}'`;
                
        var result = await pool.query(query);
    
        return true
  
    }catch(e){}
  }

};
