--------------------- User Database --------------------

Run code in file create_table.sql 

--> to create tables and to push data of vietnam toll plaza into tables 

--------------------- Vietnam Road System --------------------

Step 1: Download data of Vietnam road system from this website https://download.geofabrik.de/asia/vietnam.html

Step 2: Install pgrouting and create a database which will have pgrouting extension

Step 3: Install osm2pgrouting and transfer osm data to relational data in postgresql (it takes about 1 hour with almost 1.5 million ways)

Step 4: Run the SQL code of part "Query for BOT table" in vietnam_routing_query.sql -> to push data of Vietnam toll plaza into vietnam road system