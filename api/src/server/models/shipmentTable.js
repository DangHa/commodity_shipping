const pool = require('./connection_to_database/connectToUserDatabase')

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
          public."Route".roaddescription,
          public."TypeOfCar".name
        FROM public."Shipment"
        INNER JOIN public."TypeOfCar" ON public."TypeOfCar".typeofcar_id = public."Shipment".typeofcar_id
        INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id
        WHERE public."Shipment".shipment_id = '${shipment_id}'`
              
        var result = await pool.query(query);
        
        return result.rows

    }catch(e){}
  },

  async getSuggestedShipment(weight, space) {
    try{
        query = `
        SELECT
          shipment_id,
          starting_date,
          public."Route".starting_point,
          public."Route".destination,
          public."Route".latitude_starting_point,
          public."Route".longitude_starting_point,
          public."Route".latitude_destination,
          public."Route".longitude_destination,
          public."Route".roaddescription,
          public."Route".length,
          typeofcar_id
        FROM public."Shipment"
        INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id
        WHERE public."Shipment".starting_date >= now()::date
        AND public."Shipment".weightcapacity >= ${weight}
        AND public."Shipment".spacecapacity >= ${space};`
              
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
  },

  async createNewShipment(driver_id,
                          typeOfCar_id,
                          route_id,
                          startingDate,
                          weightCapacity,
                          spaceCapacity,
                          fee){
    try{
      query = `
      INSERT INTO public."Shipment"(
          driver_id, 
          typeofcar_id, 
          route_id, 
          starting_date,
          weightcapacity,
          spacecapacity,
          fee)
      VALUES (
          ${driver_id},
          ${typeOfCar_id},
          ${route_id},
          '${startingDate}',
          ${weightCapacity},
          ${spaceCapacity},
          ${fee});`;

      var result = await pool.query(query);
      return result

    }catch(e){}
  },

  // for admin
  async getAllShipments() {
    try{
      query = `
      SELECT
        shipment_id,
        starting_date,
        fee,
        public."Driver".phone,
        public."Driver".username,
        public."Route".starting_point,
        public."Route".destination,
        public."TypeOfCar".name,
        public."Shipment".status,
        (SELECT sum(public."Package".space) as space_total
          FROM public."Package"
          WHERE public."Package".shipment_id = public."Shipment".shipment_id),
        (SELECT sum(public."Package".weight) as weight_total
          FROM public."Package"
          WHERE public."Package".shipment_id = public."Shipment".shipment_id),
        (SELECT count(public."Package".package_id) as number_of_package
          FROM public."Package"
          WHERE public."Package".shipment_id = public."Shipment".shipment_id)
      FROM public."Shipment" 
      INNER JOIN public."TypeOfCar" ON public."TypeOfCar".typeofcar_id = public."Shipment".typeofcar_id
      INNER JOIN public."Driver" ON public."Driver".driver_id = public."Shipment".driver_id
      INNER JOIN public."Route" ON public."Route".route_id = public."Shipment".route_id`

      var result = await pool.query(query);
      return result.rows
    }catch(e){}
  },

  async statistic_shipment() {
    try{
      query = `
      SELECT
        count(public."Shipment".shipment_id) as numberOfShipment,
        to_char(starting_date,'Mon') as mon
      FROM public."Shipment"
      GROUP BY mon`

      var result = await pool.query(query);
      return result.rows
    }catch(e){}
  },

  async statistic_package() {
    try{
      query = `
      SELECT 
        count(public."Package".package_id) as numberOfpackage,
        to_char(starting_date,'Mon') as mon
      FROM public."Shipment"
      INNER JOIN public."Package" ON public."Package".shipment_id = public."Shipment".shipment_id
      GROUP BY mon`

      var result = await pool.query(query);
      return result.rows
    }catch(e){}
  },


  async deleteShipment(shipment_id){
    try{
        query = `
        UPDATE public."Shipment"
          SET status='deleted'
          WHERE shipment_id=${shipment_id};`;
                
        var result = await pool.query(query);
    
        return true
  
    }catch(e){}
  },



};
