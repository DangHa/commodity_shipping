CREATE TABLE public."User"(
	user_id serial PRIMARY KEY,
	phone VARCHAR (50) NOT NULL,
	password VARCHAR (50) NOT NULL,
	username VARCHAR (100),
	address VARCHAR (100)
);

CREATE TABLE public."Driver"(
	driver_id serial PRIMARY KEY,
	phone VARCHAR (50) NOT NULL,
	password VARCHAR (50) NOT NULL,
	username VARCHAR (100),
	address VARCHAR (100)
);

CREATE TABLE public."Route"(
	route_id serial PRIMARY KEY,
	starting_point VARCHAR,
	latitude_starting_point VARCHAR,
	longitude_starting_point VARCHAR,
	destination VARCHAR,
	latitude_destination VARCHAR,
	longitude_destination VARCHAR,
	roadDescription VARCHAR,
	length INTEGER NOT NULL
);

CREATE TABLE public."TypeOfCar"(
	typeofcar_id serial PRIMARY KEY,
	name VARCHAR (100) NOT NULL
);

DROP TABLE public."BOTprice";
DROP TABLE public."PassedBOT";
DROP TABLE public."toll_plaza";

CREATE TABLE public."toll_plaza"(
	toll_plaza_id serial PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	latitude_zone double precision,
	longitude_zone double precision
);

CREATE TABLE public."BOTprice"(
	toll_plaza_id_start INTEGER REFERENCES public."toll_plaza"(toll_plaza_id),
	toll_plaza_id_end INTEGER REFERENCES public."toll_plaza"(toll_plaza_id),
	typeofcar_id INTEGER REFERENCES public."TypeOfCar"(typeofcar_id),
	price INTEGER,
	PRIMARY KEY (toll_plaza_id_start, toll_plaza_id_end, typeofcar_id)
);

CREATE TABLE public."PassedBOT"(
	route_id INTEGER REFERENCES public."Route"(route_id),
	typeofcar_id INTEGER REFERENCES public."TypeOfCar"(typeofcar_id),
	toll_plaza_id_start INTEGER REFERENCES public."toll_plaza"(toll_plaza_id),
	toll_plaza_id_end INTEGER REFERENCES public."toll_plaza"(toll_plaza_id),
	PRIMARY KEY (toll_plaza_id_start, toll_plaza_id_end, typeofcar_id, route_id)
);


CREATE TABLE public."Shipment"(
	shipment_id serial PRIMARY KEY,
	driver_id INTEGER REFERENCES public."Driver"(driver_id),
	typeofcar_id INTEGER REFERENCES public."TypeOfCar"(typeofcar_id),
	route_id INTEGER REFERENCES public."Route"(route_id),
	starting_date DATE,
	weightCapacity INTEGER,
	spaceCapacity INTEGER,
	fee INTEGER
);

CREATE TABLE public."Package"(
	package_id serial PRIMARY KEY,
	user_id INTEGER REFERENCES public."User"(user_id),
	shipment_id INTEGER REFERENCES public."Shipment"(shipment_id),
	weight INTEGER NOT NULL,
	space INTEGER NOT NULL,
	price INTEGER,
	starting_point VARCHAR,
	latitude_starting_point VARCHAR,
	longitude_starting_point VARCHAR,
	destination VARCHAR,
	latitude_destination VARCHAR,
	longitude_destination VARCHAR,
	phone_of_receiver VARCHAR (50),
	status VARCHAR (100)
);

copy "TypeOfCar" (name)
from '/home/ha/workspace/javascript/commodity_convey/api/database_SQL/type_of_c.csv' 
DELIMITERS ',' 
CSV 
HEADER;

copy "toll_plaza" (name, latitude_zone, longitude_zone)
from '/home/ha/workspace/javascript/commodity_convey/api/database_SQL/toll_plaza.csv' 
DELIMITERS ',' 
CSV 
HEADER;

copy "BOTprice"
from '/home/ha/workspace/javascript/commodity_convey/api/database_SQL/bot_price.csv' 
DELIMITERS ',' 
CSV 
HEADER;