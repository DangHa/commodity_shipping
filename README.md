# COMMODITY SHIPPING (optimising the shipping commodity capacity)


## Description
This system was created to help drivers can maximise their income in each their shipments
For example: a driver has a plan travelling from Hanoi,Vietnam to HoChiMinh city, Vietnam by a 4-seat car. He uses Uber to fill up the three rest seats, but the luggage compartment is still not filled up. This system will help this driver to fill up the rest capacity of the car which means he can optimise the money for each travel.

How it works. It a driver has still 100 (Kg) and 100 (M^3) for his car. He will register the information of this shipment on the system, then this information will be shown for users who has packages to choose if this travel fit with their demand.

The information of 1 shipment consists:
 -, Starting point
 -, Destination
 -, Direction (The system will have a recommender system to helps drivers choose the direction which does not pass the toll plazas in Vietnam, it means reducing the cost of travel)
 -, Weight capacity
 -, Space capacity
 -, Starting day (after this day, system won't recommend this shipment to users have packages anymore)

- <strong> System Overview <strong>

![Overview system](https://gitlab.com/dangha997/commodity_carrier/uploads/22c41974673a5da80ca7221034b84825/image.png)

## Interfaces of 2 mobile apps

- <strong> Driver App <strong>

![Diagram_driver_app](https://gitlab.com/dangha997/commodity_carrier/uploads/105b6366c18e22c8a02606e7db473c2e/image.png)
![Driver_app_interface](https://gitlab.com/dangha997/commodity_carrier/uploads/515356d0c5fdc57faf3ec47e81718da5/Driver_app_interface.png)

- <strong> User App <strong>

![Diagram_user_app](https://gitlab.com/dangha997/commodity_carrier/uploads/960683afd02c1d5837dabeb856dee854/image.png)
![User_app_interface](https://gitlab.com/dangha997/commodity_carrier/uploads/331a9d9c734e3c9d65e8942a2e889702/image.png)


## Pathfinding recommender system  
This recommender system helps drivers to find suitable direction by criteria such as expenditure, length and time

  - <strong> Data used by recommender system <strong>
    . The data of Vietnam road system is come from OpenStreetMap and be extracted by geofabrik (geofabrik.de)
    . The data of Vietnam toll plaza is from some newspapers on the internet 

  - <strong> Algorithm <strong>
    The pathfinding algorithm is A* algorithm with the cost when consider in each node is

          cost = Cost_of_node * h()
        with h() = sqrt(dx) + sqrt(dy) (x, y is coordinate of nodes on earth)

  - <strong> Value of Cost_of_node <strong>

        Cost_of_node = length

    Only find the shorest path. A example of finding path from Thaibinh city to Hanoi city

    ![length](https://gitlab.com/dangha997/commodity_carrier/uploads/78cde2d617c5967b31c44c7b0ba30b6d/image.png)

        Cost_of_node = length * priority_of_road

    - With priority_of_road is
      priority_of_road = -1.0 when roads are 'steps','footway','pedestrian'
      priority_of_road = 8.0 when roads are 'residential','living_street'
      priority_of_road = 2.5 when roads are 'tertiary'
      priority_of_road = 2.0 when roads are 'secondary', 'secondary_link'
      priority_of_road = 1.8 when roads are 'primary','primary_link','primary_junction'
      priority_of_road = 1.3 when roads are 'trunk','trunk_link','trunk_junction'
      priority_of_road = 1.0 when roads are 'motorway','motorway_junction','motorway_link'

    Now it have care about the kind of each road. A example of finding path from Thaibinh city to Hanoi city

    ![length*priority_of_road](https://gitlab.com/dangha997/commodity_carrier/uploads/53023afa0069a1fa20951c09f50a554c/image.png)

         Cost_of_node = length * priority_of_road * price_highest_of_road/100 * weight

    - With price_highest_of_road is come from the BOT_toll_plaza table
          weight is from user choose and send to the server

    A example of finding path from Thaibinh city to Hanoi city
    ![length*priority_of_road*price_highest_of_road1](https://gitlab.com/dangha997/commodity_carrier/uploads/ad81581ea87f5ede8cc50f56c44b6bcd/image.png)

    A example of finding path from Ninhbinh city to Hanoi city (Green way is from recommender system with weight = 1, Blue is from Google Map API)
    ![length*priority_of_road*price_highest_of_road2](https://gitlab.com/dangha997/commodity_carrier/uploads/3d18090cdb7bee4d3a5d71e0541a017c/image.png)

## Tools used
    - React-native
    - Google map API
    - nodejs (express)
    - postgresql (database)
    - Openstreetmap, pgrouting, osm2pgrouting (data)

![Fuzzy logic](https://gitlab.com/dangha997/commodity_carrier/uploads/a39b0165c3e26a998d9bff9b273b485c/image.png)

## How to run

  - For mobile app
    Install Adroid studio and also set up some enviroment link (follow instruction to install on ubuntu)

    npm install (install library)
    npm start --reset-cache
    npx react-native run-android

  - For server 
    npm install (install library)
    npm start

  - For admin interface 
    npm install (install library)
    npm start
