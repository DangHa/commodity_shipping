const pool = require('./connection_to_database/connectToVietnam_road_system')

module.exports = {

    async find_toll_plaze(latitute_starting_point,
                          longitude_starting_point,
                          latitude_destination,
                          longitude_destination,
                          weight_BOT) {
      try{
          query = `
          with source_tmp as (SELECT osm_id FROM ways_vertices_pgr 
            ORDER BY the_geom <-> ST_GeometryFromText('POINT(${longitude_starting_point} ${latitute_starting_point})',4326) 
            LIMIT 1),
            target_tmp as (SELECT osm_id FROM ways_vertices_pgr 
            ORDER BY the_geom <-> ST_GeometryFromText('POINT(${longitude_destination} ${latitude_destination})',4326) 
            LIMIT 1)
        
          SELECT seq, edge, length, ST_AsText(b.the_geom), b.the_geom
            FROM pgr_Astar('
              SELECT gid as id, public."ways".osm_id, source_osm AS source, target_osm AS target, x1, y1, x2, y2, 
                COALESCE(highest_price, 1) as highest_price, length,
                CASE
                   WHEN public."ways".osm_id IN (SELECT osm_id FROM public."BOT_ways") THEN length * penalty * highest_price/100 * ${weight_BOT}
                   ELSE length * penalty
                END 
                AS cost,
                CASE
                   WHEN public."ways".osm_id IN (SELECT osm_id FROM public."BOT_ways") THEN length * penalty * highest_price/100 * ${weight_BOT}
                   ELSE length * penalty
                END 
                AS reverse_cost
              FROM ways
              LEFT JOIN public."BOT_ways" ON public."ways".osm_id = public."BOT_ways".osm_id
              JOIN configuration USING (tag_id);',
            (SELECT osm_id from source_tmp), (SELECT osm_id from  target_tmp), directed := true, heuristic := 5
            ) a INNER JOIN ways b ON (a.edge = b.gid) ORDER BY seq;`
                  
          var result = await pool.query(query);
          
          return result.rows
    
      }catch(e){}
  
    },

};
  