const pool = require('../connectToPostgreSQL')

module.exports = {

  async getShipmentDetail(package_id) {
    try{
        query = `
        SELECT
            package_id
            weight,
            space,
            price,
            phone_of_receiver,
            public."Driver".phone,
            public."Shipment".starting_date
        FROM public."Package"
        INNER JOIN public."Shipment" ON public."Shipment".shipment_id = public."Package".shipment_id
        INNER JOIN public."Driver" ON public."Driver".driver_id = public."Shipment".driver_id
        WHERE public."Package".package_id = '${package_id}'`
              
        var result = await pool.query(query);
        
        return result.rows

    }catch(e){}
  },

  async getSuggestedShipment(Phone) {
    try{
        query = `
        SELECT
            shipment_id,
            starting_date
        FROM public."Shipment"
        INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id
        WHERE public."Shipment".starting_date >= now()::date`
              
        var result = await pool.query(query);
        
        return result.rows

    }catch(e){}
  },

};
