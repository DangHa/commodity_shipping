import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator, Modal} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from "react-native-maps-directions";

import RetroMapStyles from '../../../assets/RetroMapStyles'
// import ShipmentForm from './shipment_form'
const GOOGLE_MAP_APIKEY = 'AIzaSyDI3l4n3NL_KbvvLtO8DuSfl4mImgrANoM';
const zoom_default = 0.2

// Get location 
const getLocation = () => {
  return new Promise(
      (resolve, reject) => {
          Geolocation.getCurrentPosition(
              (data) => resolve(data.coords),
              (err) => reject(err),
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
      }
  );
}

export default class Map extends Component {

  constructor(props){
    super(props);
    this.state={
      region: {},
      start : {},
      destination: {},
      startingPredictions: [],
      startingPointName: "",
      destinationPredictions: [],
      destinationName: "",
      length: 0,
      osm_length: 0,
      markers: [
        {
          "coordinate": {}, 
          "description": "", 
          "title": "Start",
          "draggingFunction": (e) => this.setNewStartingPoint(e.nativeEvent.coordinate)
        }, 
        {
          "coordinate": {},
          "description": "",
          "title": "Destination",
          "draggingFunction": (e) => this.setNewDestination(e.nativeEvent.coordinate)
        }
      ],
      route: {coordinates: []},
      osm_route: {coordinates: []},
      weight_BOT: "",
      loading: false
    }
  }

  componentDidMount() {
    this.getInitialState();
  }

  getInitialState() {
    getLocation().then(
      (data) => {
        this.setState({
          region: {
              latitude: data.latitude,
              longitude: data.longitude,
              latitudeDelta: zoom_default,
              longitudeDelta: zoom_default
          }
        });
      }
    );
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  shipment_detail() {
    this.props.navigation.navigate("ShipmentDetail", { 
      route                    : this.state.route,
      osm_route                : this.state.osm_route,
      startingPointName        : this.state.startingPointName,
      latitute_starting_point  : this.state.start.latitude,
      longitude_starting_point : this.state.start.longitude,
      destinationName          : this.state.destinationName,
      latitude_destination     : this.state.destination.latitude,
      longitude_destination    : this.state.destination.longitude,
      length                   : this.state.length,
      osm_length               : this.state.osm_length
    });
  }

  // --- Back to origin location , reset all other location states
  currentLocation() {
  

    this.getInitialState();

    this.setState({
      start: {}
    });

    this.setState({
      description: {}
    });


    this.setState({
      route: {coordinates: []}
    });

    this.setState({
      osm_route: {coordinates: []}
    });


    this.setState({
      markers: [
        {
          "coordinate": {}, 
          "description": "", 
          "title": "Start",
          "draggingFunction": (e) => this.setNewStartingPoint(e.nativeEvent.coordinate)
        }, 
        {
          "coordinate": {},
          "description": "",
          "title": "Destination",
          "draggingFunction": (e) => this.setNewDestination(e.nativeEvent.coordinate)
        }
      ]
    });
  }

  // ------------ Route ---------------
  setRoute() {
    this.setState({
      route: {
        coordinates: [
          { latitude: this.state.start.latitude, longitude: this.state.start.longitude },
          { latitude: this.state.destination.latitude, longitude: this.state.destination.longitude }
        ]
      }
    });

    //reset osm_direction
    this.setState({
      osm_route: {coordinates: []}
    });

    this.setState({
      osm_length: 0
    });
  }

  // ------------ Starting textinput ----------------
  async onPressStartingPoint(prediction) {
    const placeid = prediction.place_id
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${GOOGLE_MAP_APIKEY}`;
    
    // get coordinate from place id
    var start ={}
    try {
      const result = await fetch(apiUrl)
      const json = await result.json();
      
      if(json['result']){
        start = {
          latitude: json.result.geometry.location.lat,
          longitude: json.result.geometry.location.lng,
          latitudeDelta: zoom_default,
          longitudeDelta: zoom_default
        }
      }else {
        start = this.state.region
      }
      
    } catch (err) {
      console.error(err)
    }

    // change the region on map and starting point
    this.setState({
      region: start
    });
    this.setState({
      start: start
    });
    this.setState({
      startingPointName: prediction.description
    })

    // remove the prediction dropdown
    this.setState({
      startingPredictions: []
    });

    // add a maker
    this.setState({
      markers: [
        {
          "coordinate": {"latitude": start.latitude, "longitude": start.longitude}, 
          "description": prediction.description, 
          "title": "Start",
          "draggingFunction": (e) => this.setNewStartingPoint(e.nativeEvent.coordinate)
        },
        this.state.markers[1]
      ]
    })

    // Trigger creating route
    if(this.state.destination['latitude']){
      this.setRoute()
    }
    
  };

  async onChangeStart(start){  
    this.setState({
      startingPointName: start
    })
    
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAP_APIKEY}&input=${start}&location=${this.state.region.latitude}, ${this.state.region.longitude}&radius=20000`;
    
    try {
      const result = await fetch(apiUrl)
      const json = await result.json();
      this.setState({
        startingPredictions: json.predictions
      })
    } catch (err) {
      console.error(err)
    }
  }

  //Dragging destination marker
  setNewStartingPoint(coords) {
    this.setState({
      startingPointName: ""
    });

    this.setState({
      start: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: zoom_default,
        longitudeDelta: zoom_default
      }
    });

    this.setState({
      markers: [
        {
          "coordinate": {"latitude": coords.latitude, "longitude": coords.longitude}, 
          "description": "", 
          "title": "Start",
          "draggingFunction": (e) => this.setNewStartingPoint(e.nativeEvent.coordinate)
        },
        this.state.markers[1]
      ]
    })

    // Trigger creating route
    if(this.state.destination['latitude']){
      this.setRoute()
    }
  }

  // ------------ Destination textinput ------------------
  async onPressDestination(prediction) {
    const placeid = prediction.place_id
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${GOOGLE_MAP_APIKEY}`;
    
    // get coordinate from place id
    var destination = {}
    try {
      const result = await fetch(apiUrl)
      const json = await result.json();
      
      if(json['result']){
        destination = {
          latitude: json.result.geometry.location.lat,
          longitude: json.result.geometry.location.lng,
          latitudeDelta: zoom_default,
          longitudeDelta: zoom_default
        }
      }else {
        destination = this.state.region
      }
      
      
    } catch (err) {
      console.error(err)
    }

    // change the region on map and starting point
    this.setState({
      region: destination
    });
    this.setState({
      destination: destination
    });
    this.setState({
      destinationName: prediction.description
    })

    // remove the prediction dropdown
    this.setState({
      destinationPredictions: []
    });

    // add a maker
    this.setState({
      markers: [
        this.state.markers[0],
        {
          "coordinate": {"latitude": destination.latitude, "longitude": destination.longitude}, 
          "description": prediction.description, 
          "title": "Destination",
          "draggingFunction": (e) => this.setNewDestination(e.nativeEvent.coordinate)
        }
      ]
    })

    // trigger drawing route 
    if(this.state.start['latitude']){
      this.setRoute()
    }
  };

  async onChangeDestination(destination){  
    this.setState({
      destinationName: destination
    })
    
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAP_APIKEY}&input=${destination}&location=${this.state.region.latitude}, ${this.state.region.longitude}&radius=20000`;
    
    try {
      const result = await fetch(apiUrl)
      const json = await result.json();
      this.setState({
        destinationPredictions: json.predictions
      })
    } catch (err) {
      console.error(err)
    }
  }

  //Dragging destination marker
  setNewDestination(coords) {
    this.setState({
      destinationName: ""
    });

    this.setState({
      destination: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: zoom_default,
        longitudeDelta: zoom_default
      }
    });

    this.setState({
      markers: [
        this.state.markers[0],
        {
          "coordinate": {"latitude": coords.latitude, "longitude": coords.longitude}, 
          "description": "", 
          "title": "Destination",
          "draggingFunction": (e) => this.setNewDestination(e.nativeEvent.coordinate)
        }
      ]
    })

    // trigger drawing route 
    if(this.state.start['latitude']){
      this.setRoute()
    }
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.route.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  changeWeight_BOT(weight) {
    this.setState({ weight_BOT : weight})
  }

  async getSuggestedDirection(){
    console.log(this.state.weight_BOT)

    // check weight of BOT
    if (this.state.weight_BOT < 0.1 || this.state.weight_BOT > 1){
      alert("You should just put a number between 0.1-1. 0.1 is for choosing to go through BOT roads, while 1 is for avoiding")
      return
    }else if (this.state.weight_BOT === ""){
      alert("You haven't had the weight for BOT ways")
      return
    }

    // check starting point and destination
    if (this.state.startingPointName === "" || this.state.destinationName === "" ){
      alert("You haven't had the starting point, destination yet")
    }else {

      this.setState({ loading : true})
      // send starting, end point and weight bot to server 
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          latitute_starting_point   : this.state.start.latitude,
          longitude_starting_point  : this.state.start.longitude,
          latitude_destination      : this.state.destination.latitude,
          longitude_destination     : this.state.destination.longitude,
          weight_BOT                : this.state.weight_BOT,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }

      var result = await fetch('http://172.18.0.1:8080/direction/getSuggestedDirection', data)
              .then((response) => response.json())
              .then((json) => {
                  return json
              })
              .catch((error) => {
                  console.error(error);
              });
 
      if (result.length !== null){
        this.setState({
          osm_route : {coordinates: result.roadDescription},
          osm_length: result.osm_length
        });

        this.setState({ loading : false})
      } else {
        alert("There are something wrong")
      }
    }
  }

  render() {
    // Autocomplete place dropdowns
    const startingPredictions = this.state.startingPredictions.map(prediction => (
      <Text style={styles.suggestions} key={prediction.id} onPress={() => this.onPressStartingPoint(prediction)}>
        {prediction.description}
      </Text>
    ));

    const destinationPredictions = this.state.destinationPredictions.map(prediction => (
      <Text style={styles.suggestions} key={prediction.id} onPress={() => this.onPressDestination(prediction)}>
        {prediction.description}
      </Text>
    ));

  
    return (
      
      <View style={{ flex: 1 }}>
        <CustomProgressBar isModalVisible = {this.state.loading} />
        {this.state.region['latitude'] ?
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={map => {this.map = map;}}
              style={styles.map}
              customMapStyle={ RetroMapStyles }
              initialRegion = {this.state.region}
              // region={this.state.region}
              onRegionChangeComplete={(region) => this.onMapRegionChange(region)}
              onPress={this.onMapPress}
              showsUserLocation={true}>

              {/* --- show the marker --- */}
              {this.state.markers.map(function(marker) {
                if (marker.coordinate['latitude']) {
                  return <MapView.Marker 
                    draggable
                    onDragEnd={marker.draggingFunction}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                  />  
                }else{
                  return null
                }   
              })}

              {/* --- OSM Direction --- */}
              {this.state.osm_route.coordinates.length >= 2?
                <Polyline
                    coordinates= {this.state.osm_route.coordinates}
                    strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                      '#7F0000',
                      '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                      '#B24112',
                      '#E5845C',
                      '#238C23',
                      '#7F0000'
                    ]}
                    strokeWidth={5}
                  />
              : null }

              {/* --- Google Direction --- */}
              {this.state.route.coordinates.length >= 2?
                <MapViewDirections
                  origin      = {this.state.route.coordinates[0]}
                  waypoints   = { [] }
                  destination = {this.state.route.coordinates[this.state.route.coordinates.length-1]}
                  apikey      = {GOOGLE_MAP_APIKEY}
                  strokeWidth = {5}
                  strokeColor = "#1565c0"
                  onStart={(params)=>{
                    console.log("Draw a direction");
                  }}
                  onReady={result => {
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)

                    this.setState({
                      length: result.distance
                    });

                    this.setState({
                      route: {
                        coordinates: result.coordinates
                      }
                    });
                  }}
                />
              : null}

            </MapView>

            <View style={styles.inputBox}>
              <Icon style={styles.imageStyle} size={15} name={'location-searching'} />
              <TextInput style={{ flex: 1 }}
                onChangeText={(start) => this.onChangeStart(start)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="  Starting point"
                selectionColor="#fff"
                keyboardType="default"
                value={this.state.startingPointName}/>
            </View>
            <View style={styles.inputBox}>
              <Icon style={styles.imageStyle} size={15} name={'keyboard-arrow-right'} />
              <TextInput style={{ flex: 1 }}
                  onChangeText={(destination) => this.onChangeDestination(destination)} 
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="  Destination"
                  selectionColor="#fff"
                  keyboardType="default"
                  value={this.state.destinationName}/>
              </View>
              {startingPredictions}
              {destinationPredictions}
            
            <View style={styles.bottom}>
              {this.state.start['latitude'] && this.state.destination['latitude'] ?
                <View style={[{flexDirection:"row", marginBottom: -45, marginLeft: 5}]}>
                  <TextInput style={[styles.inputBox, {width: 100, marginVertical: 0}]}
                      onChangeText={(weight) => this.changeWeight_BOT(weight)} 
                      underlineColorAndroid='rgba(0,0,0,0)' 
                      placeholder=" 0.1 -> 1"
                      selectionColor="#fff"
                      keyboardType="numeric"/>

                  <View style={[{marginBottom: 0, marginLeft: 10}]}>
                    <TouchableOpacity style={styles.button}> 
                      <Text style={styles.buttonText} onPress={this.getSuggestedDirection.bind(this)}>Direction with weigh BOT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              : null}

              {/* --- Route Change --- */}
              {this.state.start['latitude'] && this.state.destination['latitude'] ?
                <TouchableOpacity style={styles.styletouchable} onPress={this.shipment_detail.bind(this)}>
                  <Icon style={[styles.imageButton, {backgroundColor: '#1565c0'}, {color: 'white'}]} size={25} name={'done'}/>
                </TouchableOpacity>
              : null}
              <TouchableOpacity style={styles.styletouchable} onPress={this.currentLocation.bind(this)}>
                <Icon style={styles.imageButton} size={25} name={'my-location'}/>
              </TouchableOpacity>
            </View>
            
          </View>
        : null}
      </View>
                
    );
  }
}

// Loading spiner
const CustomProgressBar = ({ isModalVisible }) => (
  <Modal 
    transparent
    visible={isModalVisible} >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.0001) !important', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.6)', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200', color: 'white' }}>Please wait</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  inputBox: {
    width: 370,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    color: '#002f6c',
    marginLeft: 20,
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 16,
  },
  imageStyle: {
    marginLeft: 5
  },
  imageButton:{
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  styletouchable: {
    width: 40,
    height: 40,
    marginLeft: 350,
    marginVertical: 5,
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  suggestions: {
    width: 370,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    fontSize: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  button: {
    width: 200,
    backgroundColor: '#1565c0',
    borderRadius: 25,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});