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

![Overview system](https://user-images.githubusercontent.com/20589233/183610133-4c9d9433-80d5-45d8-8c47-9ba10c667d24.png)

## Interfaces of 2 mobile apps

- **Driver App**

![Diagram_driver_app](https://user-images.githubusercontent.com/20589233/183610153-ebb7acd4-2adb-4f05-80c3-1bce25b4e41e.png)
![Driver_app_interface](https://user-images.githubusercontent.com/20589233/183610165-81e1dece-11bf-40ab-852b-580b8c0640e8.png)

- **User App**

![Diagram_user_app](https://user-images.githubusercontent.com/20589233/183610192-839b9420-06ed-4446-8fb4-c8f9a48c2655.png)
![User_app_interface](https://user-images.githubusercontent.com/20589233/183610198-011cfdc7-bc58-49a1-ac9b-009f6429ce11.png)


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

  ![length](https://user-images.githubusercontent.com/20589233/183610207-80090643-b717-45aa-b9e9-85c524929127.png)

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
  Briefly, length ∈ (0.00001, 9)  and h() ∈ (0.0001 -> 5). length is always in this range,no matter node being considered is close to the destination, while the range of h() will be changed

  Now it can be affected by the kind of each road. An example of finding a path from Thaibinh city to Hanoi city <br/>

  ![length*priority_of_road](https://user-images.githubusercontent.com/20589233/183610822-e7a8a96b-33ac-4ce8-8157-89cf74c95773.png)

  The result now is similar to the Google Map  <br/>

  ![Google Map](https://user-images.githubusercontent.com/20589233/183610827-f12bf442-729c-46be-a458-f2e95d81b993.png)
    
    * ***influence of price_of_road*** <br/> 

          Cost_of_node = length * priority_of_road * (price_highest_of_road/100)^weight

  -, price_highest_of_road is come from the BOT_toll_plaza table<br/>
  -, weight is from user choose and send to the server <br/>
    *(weight ∈ [0, 1])*

  An example of finding a path from Thaibinh city to Hanoi city. The recommender system's result avoid the direction passing the CT01 (Pháp vân- Cầu giẽ)- a BOT project where you have to pay if you want to go through
  ![length*priority_of_road*price_highest_of_road1](https://user-images.githubusercontent.com/20589233/183610852-6d61a1fe-63f9-4313-93e1-7248fe1cf0ac.png)

  An example of finding a path from Ninhbinh city to Hanoi city (Green way is from recommender system with weight = 1, Blue is from Google Map API. The former runs on the QL1A which doesn't have any toll plaza, while the latter runs CT01 which have 4 toll plazas)
  ![length*priority_of_road*price_highest_of_road2](https://user-images.githubusercontent.com/20589233/183610857-7261b81e-1a5a-46d9-9ef0-15d521bf5f7c.png)

## Tools used
    - React-native
    - Google map API
    - nodejs (express)
    - postgresql (database)
    - Openstreetmap, pgrouting, osm2pgrouting (data)

![Tools](https://user-images.githubusercontent.com/20589233/183611510-027f3d75-8789-42ad-863b-c2f834582d74.png)

## How to run

  - Database <br/>
    Follow instruction in file 1_README_for_creating-database.md in /api/database_SQL

  - For mobile app <br/>
    Install Adroid studio and also set up some environment link (follow instruction to install on ubuntu)
```shell
npm install (install library) 
npm start --reset-cache 
npx react-native run-android 
```
  - For server <br/>
```shell
npm install (install library) 
npm start
```
  - For admin interface  <br/>
```shell
npm install (install library) 
npm start 
```
