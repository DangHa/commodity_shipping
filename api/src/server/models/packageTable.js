const pool = require('./connection_to_database/connectToUserDatabase')

module.exports = {

  async createNewPackage(user_id,
                        shipment_id,
                        weight,
                        space,
                        price,
                        startingPointName,
                        latitute_starting_point,
                        longitude_starting_point,
                        destinationName,
                        latitude_destination,
                        longitude_destination,
                        phoneOfReceiver) {
                          
    try{
      query = `
        INSERT INTO public."Package"(
          user_id,
          shipment_id,
          weight,
          space,
          price,
          starting_point,
          latitude_starting_point,
          longitude_starting_point,
          destination,
          latitude_destination,
          longitude_destination,
          phone_of_receiver,
          status)
        VALUES ('${user_id}', '${shipment_id}', '${weight}',
                '${space}', '${price}', '${startingPointName}', 
                '${latitute_starting_point}', '${longitude_starting_point}',
                '${destinationName}', '${latitude_destination}', '${longitude_destination}',
                '${phoneOfReceiver}', 'waitting')`;

        var result = await pool.query(query);
        return true

    }catch(e){}
  },

  async getPackageDetail(package_id) {
    try{
        query = `
        SELECT
            package_id,
            weight,
            space,
            price,
            latitude_starting_point,
            longitude_starting_point,
            latitude_destination,
            longitude_destination,
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

  async getPackageByPhone(Phone) {
    try{
        query = `
        SELECT
            package_id,
            starting_point,
            destination,
            public."Package".status
        FROM public."Package"
        INNER JOIN public."User" ON public."User".user_id = public."Package".user_id
        WHERE public."User".phone = '${Phone}';`
              
        var result = await pool.query(query);
        return result.rows

    }catch(e){}
  },

  async updatePackageShipment_id(package_id, shipment_id) {
    try{
      query = `
      UPDATE public."Package"
      SET status = 'waitting', shipment_id = ${shipment_id}
      WHERE package_id = ${package_id}`
            
      var result = await pool.query(query);
      
      return true

    }catch(e){}
  },

  async getWaitingPackageByShipment(shipment_id) {
    try{
      query = `
      SELECT count(package_id)
      FROM public."Package"
      where shipment_id = '${shipment_id}' and status = 'waitting'`
            
      var result = await pool.query(query);

      return result.rows[0].count

    }catch(e){}
  },

  async getPackageByShipment(shipment_id) {
    try{
      query = `
      SELECT package_id,
            phone, 
            weight, 
            space, 
            price, 
            starting_point, 
            destination, 
            phone_of_receiver, 
            public."Package".status
      FROM public."Package"
      INNER JOIN public."User" ON public."User".user_id = public."Package".user_id
      where shipment_id = '${shipment_id}' and status != 'refused'
      Order by status desc`
            
      var result = await pool.query(query);

      return result.rows

    }catch(e){}
  },

  async updatePackageStatus(package_id, status) {

    try{
      query = `
      UPDATE public."Package"
      SET status = '${status}'
      WHERE package_id = ${package_id}`
            
      var result = await pool.query(query);
      
      return true

    }catch(e){}
  }
  
};
