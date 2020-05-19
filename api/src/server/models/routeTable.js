const pool = require('./connectToPostgreSQL')

module.exports = {

  async getRouteDetail(shipment_id) {
    try{
        query = `
        SELECT
          shipment_id,
          starting_date,
          public."Route".starting_point,
          public."Route".latitude_starting_point,
          public."Route".longitude_starting_point,
          public."Route".destination,
          public."Route".latitude_destination,
          public."Route".longitude_destination,
          public."TypeOfCar".name
        FROM public."Shipment"
        INNER JOIN public."TypeOfCar" ON public."TypeOfCar".typeofcar_id = public."Shipment".typeofcar_id
        INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id
        WHERE public."Shipment".shipment_id = '${shipment_id}'`
              
        var result = await pool.query(query);
        
        return result.rows

    }catch(e){}
  },

  async createNewRoute(startingPointName,
                        latitute_starting_point,
                        longitude_starting_point,
                        destinationName,
                        latitude_destination,
                        longitude_destination,
                        roadDescription,
                        length){
    try{
      query = `
        INSERT INTO public."Route"(
            starting_point,
            latitude_starting_point,
            longitude_starting_point,
            destination,
            latitude_destination,
            longitude_destination,
            roaddescription,
            length)
        VALUES (
            '${startingPointName}', 
            '${latitute_starting_point}', 
            '${longitude_starting_point}', 
            '${destinationName}', 
            '${latitude_destination}', 
            '${longitude_destination}', 
            '${roadDescription}', 
            ${length})
        RETURNING *;`;
      
      console.log(query)
      var result = await pool.query(query);
      return result

    }catch(e){}
  },

};
