1, Thành phố Ninh Bình:105.974596 20.250304
2, Thành phố Thái Bình: 106.3216468 20.4384784
3, Cảnh Đình Vũ Hải Phòng: 106.766559 20.837813
4, Sân bay Vân Đồn: 107.419695 21.113701
5, Hồ Chí Minh City: 106.798081 10.859158

-------------- Cost is just combined of length

with source_tmp as (SELECT osm_id FROM ways_vertices_pgr 
		ORDER BY the_geom <-> ST_GeometryFromText('POINT(105.8422401 20.9836114)',4326) 
		LIMIT 1),
    target_tmp as (SELECT osm_id FROM ways_vertices_pgr 
		ORDER BY the_geom <-> ST_GeometryFromText('POINT(106.3216468 20.4384784)',4326) 
		LIMIT 1)

SELECT seq, edge, length, ST_AsText(b.the_geom), b.the_geom
	FROM pgr_Astar('
		SELECT gid as id, osm_id, source_osm AS source, target_osm AS target, x1, y1, x2, y2, 
		length as cost , length as reverse_cost
		FROM ways',
	(SELECT osm_id from source_tmp), (SELECT osm_id from  target_tmp), directed := true, heuristic := 5
	) a INNER JOIN ways b ON (a.edge = b.gid) ORDER BY seq;

------------------------- Cost is combined of length and penalty ---------------------------
ALTER TABLE configuration ADD COLUMN penalty FLOAT;
--

UPDATE configuration SET penalty=3;

-- Not including pedestrian ways
UPDATE configuration SET penalty=-1.0 WHERE tag_value IN ('steps','footway','pedestrian');
-- Penalizing with 5 times the costs
UPDATE configuration SET penalty=8 WHERE tag_value IN ('residential','living_street');
-- Encuraging the use of "fast" roads
UPDATE configuration SET penalty=2.5 WHERE tag_value IN ('tertiary');
UPDATE configuration SET penalty=2 WHERE tag_value IN ('secondary', 'secondary_link');
UPDATE configuration SET penalty=1.8 WHERE tag_value IN ('primary','primary_link','primary_junction');
UPDATE configuration SET penalty=1.3 WHERE tag_value IN ('trunk','trunk_link','trunk_junction');
UPDATE configuration SET penalty=1 WHERE tag_value IN ('motorway','motorway_junction','motorway_link');

with source_tmp as (SELECT osm_id FROM ways_vertices_pgr 
		ORDER BY the_geom <-> ST_GeometryFromText('POINT(105.8422401 20.9836114)',4326) 
		LIMIT 1),
    target_tmp as (SELECT osm_id FROM ways_vertices_pgr 
		ORDER BY the_geom <-> ST_GeometryFromText('POINT(106.3216468 20.4384784 )',4326) 
		LIMIT 1)

SELECT seq, edge, length, ST_AsText(b.the_geom), b.the_geom
	FROM pgr_Astar('
		SELECT gid as id, osm_id, source_osm AS source, target_osm AS target, x1, y1, x2, y2, 
		length * penalty as cost , length * penalty as reverse_cost
		FROM ways JOIN configuration
    	USING (tag_id)',
	(SELECT osm_id from source_tmp), (SELECT osm_id from  target_tmp), directed := true, heuristic := 5
	) a INNER JOIN ways b ON (a.edge = b.gid) ORDER BY seq;

-------------------------- Query for BOT table -------------------------

-- Table of vietnam road system
DROP TABLE public."BOT_ways";

CREATE TABLE public."BOT_ways"(
	road_id serial PRIMARY KEY,
	name VARCHAR,
	osm_id BIGINT,
	highest_price INTEGER
);

copy "BOT_ways" (name, osm_id, highest_price)
from '/home/ha/workspace/javascript/commodity_convey/api/database_SQL/expressway_osm.csv' 
DELIMITERS ',' 
CSV 
HEADER;

-- Get price

SELECT gid as id, public."ways".osm_id, source_osm AS source, target_osm AS target, x1, y1, x2, y2, 
		cost as length_cost, reverse_cost, COALESCE(highest_price, 1) as highest_price,
		CASE
		   WHEN public."ways".osm_id IN (SELECT osm_id FROM public."BOT_ways") THEN cost*highest_price/100
		   ELSE cost
		END 
		AS cost
FROM ways
LEFT JOIN public."BOT_ways" ON public."ways".osm_id = public."BOT_ways".osm_id;