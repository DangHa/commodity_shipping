const pool = require('./connectToPostgreSQL')

module.exports = {

  async find_toll_plaze(latitude_zone, longitude_zone, radius) {
    try{
        query = `
        SELECT *
          FROM public.toll_plaza
        WHERE abs(latitude_zone - ${latitude_zone}) < ${radius}
        and abs(longitude_zone - ${longitude_zone}) < ${radius};`
                
        var result = await pool.query(query);
        
        return result.rows
  
    }catch(e){}

  },

  async find_toll_plaze_price(toll_plaza_id_start, toll_plaza_id_end, typeOfCar_id) {
    try{
        query = `
        SELECT *
          FROM public."BOTprice"
        WHERE toll_plaza_id_start = '${toll_plaza_id_start}'
          AND toll_plaza_id_end = '${toll_plaza_id_end}'
          AND typeofcar_id = '${typeOfCar_id}';`
                
        var result = await pool.query(query);
        
        return result.rows
  
    }catch(e){}

  }

};
