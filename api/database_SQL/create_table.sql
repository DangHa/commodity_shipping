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

CREATE TABLE public."Package"(
	package_id serial PRIMARY KEY,
	user_id INTEGER REFERENCES public."User"(user_id),
	shipment_id INTEGER REFERENCES public."Shipment"(shipment_id),
	weight INTEGER NOT NULL,
	space INTEGER NOT NULL,
	price INTEGER,
	starting_point VARCHAR,
	destination VARCHAR,
	phone_of_receiver VARCHAR (50),
	status VARCHAR (100)
);

CREATE TABLE public."BOTroad"(
	road_id serial PRIMARY KEY,
	name VARCHAR (100) NOT NULL
);

CREATE TABLE public."TypeOfCar"(
	typeofcar_id serial PRIMARY KEY,
	name VARCHAR (100) NOT NULL
);

CREATE TABLE public."BOTprice"(
	road_id INTEGER REFERENCES public."BOTroad"(road_id),
	typeofcar_id INTEGER REFERENCES public."TypeOfCar"(typeofcar_id),
	price INTEGER,
	PRIMARY KEY (road_id, typeofcar_id)
);

CREATE TABLE public."Route"(
	route_id serial PRIMARY KEY,
	roadDescription VARCHAR,
	length INTEGER NOT NULL
);

CREATE TABLE public."PassedBOT"(
	road_id INTEGER REFERENCES public."BOTroad"(road_id),
	typeofcar_id INTEGER REFERENCES public."TypeOfCar"(typeofcar_id),
	route_id INTEGER REFERENCES public."Route"(route_id),
	PRIMARY KEY (road_id, typeofcar_id, route_id)
);

CREATE TABLE public."Shipment"(
	shipment_id serial PRIMARY KEY,
	driver_id INTEGER REFERENCES public."Driver"(driver_id),
	typeofcar_id INTEGER REFERENCES public."TypeOfCar"(typeofcar_id),
	route_id INTEGER REFERENCES public."Route"(route_id),
	starting_date DATE,
	weightCapacity INTEGER,
	spaceCapacity INTEGER
);