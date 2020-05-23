const pool = require('./connection_to_database/connectToUserDatabase')

module.exports = {

  async getAllDriver() {
    try{
      var result = await pool.query('SELECT * FROM public."Driver"');
      return result.rows
    }catch(e){}
  },

  async findDriverByPhone(Phone) {
    try{
      query = `SELECT * FROM public."Driver" 
              WHERE phone = '${Phone}'`
              
      var result = await pool.query(query);
      
      return result.rows

    }catch(e){}
  },

  async insertDriver(Phone, Password){
    try{
        query = `INSERT INTO public."Driver"(phone, password)
          VALUES ('${Phone}', '${Password}')`;
                
        var result = await pool.query(query);
    
        return true
  
    }catch(e){}
  },

  async updateInforDriver(OldPhone, Phone, Username, Address){
    try{
        query = `UPDATE public."Driver"
            SET phone='${Phone}', username='${Username}', address='${Address}'
            WHERE phone = '${OldPhone}'`;
                
        var result = await pool.query(query);
    
        return true
  
    }catch(e){}
  }

};
