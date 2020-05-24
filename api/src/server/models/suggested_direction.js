const pool = require('./connection_to_database/connectToVietnam_road_system')

module.exports = {

    async find_toll_plaze(latitute_starting_point,
                          longitude_starting_point,
                          latitude_destination,
                          longitude_destination) {
      try{
          query = `
          with source_tmp as (SELECT osm_id FROM ways_vertices_pgr 
            ORDER BY the_geom <-> ST_GeometryFromText('POINT(${longitude_starting_point} ${latitute_starting_point})',4326) 
            LIMIT 1),
            target_tmp as (SELECT osm_id FROM ways_vertices_pgr 
            ORDER BY the_geom <-> ST_GeometryFromText('POINT(${longitude_destination} ${latitude_destination})',4326) 
            LIMIT 1)
        
          SELECT seq, edge, ST_AsText(b.the_geom)
            FROM pgr_bdAstar('
              SELECT gid as id, source_osm AS source, target_osm AS target, 
              cost, reverse_cost, x1, y1, x2, y2 FROM ways',
            (SELECT osm_id from source_tmp), (SELECT osm_id from  target_tmp), directed := true, heuristic := 5
            ) a INNER JOIN ways b ON (a.edge = b.gid) ORDER BY seq;`
                  
          var result = await pool.query(query);
          
          return result.rows
    
      }catch(e){}
  
    },

};
  