const pool = require('./connectToPostgreSQL')

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

  async getPackageByPhone(Phone) {
    try{
        query = `
        SELECT
            package_id,
            starting_point,
            destination,
            status
        FROM public."Package"
        INNER JOIN public."User" ON public."User".user_id = public."Package".user_id
        WHERE public."User".phone = '${Phone}';`
              
        var result = await pool.query(query);
        
        return result.rows

    }catch(e){}
  },

};
