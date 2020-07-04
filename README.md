# COMMODITY SHIPPING
### (optimising the shipping commodity capacity)


## Description
This system was created to help drivers can maximise their income in each their shipment
For example: a driver has a plan travelling from Hanoi,Vietnam to HoChiMinh,Vietnam by a 4-seat car. He uses Uber to fill up the three rest seats, but the luggage compartment is still not filled up. This system will help this driver to fill up the rest capacity of the car which means he can optimise the money for each travel.

How it works. If a driver has still 100 (Kg) and 100 (M^3) in his car. He will register these information of this shipment on the system, then those information will be shown for users who has packages to choose if this travel fit with their demand.

The information of 1 shipment consists: <br/>
    -, Starting point <br/>
    -, Destination <br/>
    -, Direction (The system will have a recommender system to helps drivers choose the direction which does not pass the toll plazas in Vietnam, it means reducing the cost of travel) <br/>
    -, Weight capacity <br/>
    -, Space capacity <br/>
    -, Starting day (after this day, the system won't recommend this shipment to users have packages anymore) <br/>

- **System Overview**

![Overview system](https://gitlab.com/dangha997/commodity_carrier/uploads/22c41974673a5da80ca7221034b84825/image.png)

## Interfaces of 2 mobile apps

- **Driver App**

![Diagram_driver_app](https://gitlab.com/dangha997/commodity_carrier/uploads/105b6366c18e22c8a02606e7db473c2e/image.png)
![Driver_app_interface](https://gitlab.com/dangha997/commodity_carrier/uploads/515356d0c5fdc57faf3ec47e81718da5/Driver_app_interface.png)

- **User App**

![Diagram_user_app](https://gitlab.com/dangha997/commodity_carrier/uploads/960683afd02c1d5837dabeb856dee854/image.png)
![User_app_interface](https://gitlab.com/dangha997/commodity_carrier/uploads/331a9d9c734e3c9d65e8942a2e889702/image.png)


## Pathfinding recommender system  
This recommender system helps drivers to find suitable direction by criteria such as time, length of way and expense

- **Data used by recommender system** <br/>

  -, The data of Vietnam road system is come from OpenStreetMap and be extracted by geofabrik (geofabrik.de)<br/>
  -, The data of Vietnam toll plaza is from some Vietnam newspapers <br/>

- **A-star Algorithm** <br/>

  The pathfinding algorithm is A* algorithm with the cost which be calculated in each node is <br/>

          cost = Cost_of_node + h()
        with h() = sqrt(dx) + sqrt(dy) (x, y are earth coordinates of node)

- **Value of Cost_of_node** <br/>
    * ***influence of length*** <br/>

          Cost_of_node = length

  Only find the shortest path. An example of finding a path from Thaibinh city to Hanoi city <br/>

  ![length](https://gitlab.com/dangha997/commodity_carrier/uploads/78cde2d617c5967b31c44c7b0ba30b6d/image.png)

    * ***influence of priority_of_road*** <br/> 

          Cost_of_node = length * priority_of_road

  -, With priority_of_road is <br/>
    priority_of_road = -1.0 when roads are 'steps','footway','pedestrian' <br/>
    priority_of_road = 8.0 when roads are 'residential','living_street' <br/> 
    priority_of_road = 2.5 when roads are 'tertiary' <br/>
    priority_of_road = 1.8 when roads are 'secondary', 'secondary_link' <br/>
    priority_of_road = 1.5 when roads are 'primary','primary_link','primary_junction' <br/>
    priority_of_road = 1.3 when roads are 'trunk','trunk_link','trunk_junction' <br/>
    priority_of_road = 1.0 when roads are 'motorway','motorway_junction','motorway_link' <br/>
  
  -> This numbers has been chosen from the attributes of the data of length and h(). <br/>
  Briefly, length ~ (0.00001, 9)  and h() ~ (0.0001 -> 5). length is always in this range,no matter node being considered is close to the destination, while the range of h() will be changed

  Now it can be affected by the kind of each road. An example of finding a path from Thaibinh city to Hanoi city <br/>

  ![length*priority_of_road](https://gitlab.com/dangha997/commodity_carrier/uploads/53023afa0069a1fa20951c09f50a554c/image.png)

  The result now is similar to the Google Map  <br/>

  ![Google Map](https://gitlab.com/dangha997/commodity_carrier/uploads/9c66b64f6286f8dc825c8797e45ab4be/image.png)
    
    * ***influence of price_of_road*** <br/> 

          Cost_of_node = length * priority_of_road * price_highest_of_road/100 * weight

  -, price_highest_of_road is come from the BOT_toll_plaza table<br/>
  -, weight is from user choose and send to the server <br/>

  An example of finding a path from Thaibinh city to Hanoi city. The recommender system's result avoid the direction passing the CT01 (Pháp vân- Cầu giẽ)- a BOT project where you have to pay if you want to go through
  ![length*priority_of_road*price_highest_of_road1](https://gitlab.com/dangha997/commodity_carrier/uploads/782ce689f4db973c3d8d778fd79e1cbf/image.png)

  An example of finding a path from Ninhbinh city to Hanoi city (Green way is from recommender system with weight = 1, Blue is from Google Map API. The former runs on the QL1A which doesn't have any toll plaza, while the latter runs CT01 which have 4 toll plazas)
  ![length*priority_of_road*price_highest_of_road2](https://gitlab.com/dangha997/commodity_carrier/uploads/3d18090cdb7bee4d3a5d71e0541a017c/image.png)

## Tools used
    - React-native
    - Google map API
    - nodejs (express)
    - postgresql (database)
    - Openstreetmap, pgrouting, osm2pgrouting (data)

![Fuzzy logic](https://gitlab.com/dangha997/commodity_carrier/uploads/a39b0165c3e26a998d9bff9b273b485c/image.png)

## How to run

  - Database <br/>
    Follow instruction in file 1_README_for_creating-database.md in /api/database_SQL

  - For mobile app <br/>
    Install Adroid studio and also set up some environment link (follow instruction to install on ubuntu)

    npm install (install library) <br/>
    npm start --reset-cache <br/>
    npx react-native run-android <br/>

  - For server <br/>
    npm install (install library) <br/>
    npm start

  - For admin interface  <br/>
    npm install (install library) <br/>
    npm start <br/>
