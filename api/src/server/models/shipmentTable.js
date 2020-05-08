const pool = require('./connectToPostgreSQL')

module.exports = {

  async getShipmentDetail(shipment_id) {
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

  async getSuggestedShipment(Phone) {
    try{
        query = `
        SELECT
            shipment_id,
            starting_date,
            public."Route".starting_point,
	          public."Route".destination
        FROM public."Shipment"
        INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id
        WHERE public."Shipment".starting_date >= now()::date`
              
        var result = await pool.query(query);
        
        return result.rows

    }catch(e){}
  },

  async getShipmentsByDriver(driver_id){
    try{
      query = `
      SELECT shipment_id,
        public."TypeOfCar".name,
        public."Route".starting_point,
        public."Route".destination,
        starting_date,
        weightcapacity,
        spacecapacity,
        fee
      FROM public."Shipment"
      INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id
      INNER JOIN public."TypeOfCar" ON public."TypeOfCar".typeofcar_id = public."Shipment".typeofcar_id
      WHERE public."Shipment".driver_id = '${driver_id}'
      ORDER BY starting_date DESC`
            
      var result = await pool.query(query);
      
      return result.rows

    }catch(e){}
  }

};
