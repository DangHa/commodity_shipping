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

  }

};
