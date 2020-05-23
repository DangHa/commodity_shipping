const pool = require('./connection_to_database/connectToVietnam_road_system')

module.exports = {

    async find_toll_plaze(startingPoint, destination) {
      try{
          query = `
          SELECT seq, edge, b.the_geom AS "the_geom"
            FROM pgr_dijkstra('
                    SELECT gid as id, source, target,
                            length as cost FROM ways',
                    100, 600, false
            ) a INNER JOIN ways b ON (a.edge = b.gid) ORDER BY seq;`
                  
          var result = await pool.query(query);
          
          return result.rows
    
      }catch(e){}
  
    },

};
  