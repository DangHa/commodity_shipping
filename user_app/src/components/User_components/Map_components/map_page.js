import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RetroMapStyles from '../../../assets/RetroMapStyles'
const GOOGLE_MAP_APIKEY = 'AIzaSyDI3l4n3NL_KbvvLtO8DuSfl4mImgrANoM';

// Get location 
const getLocation = () => {
  return new Promise(
      (resolve, reject) => {
          Geolocation.getCurrentPosition(
              (data) => resolve(data.coords),
              (err) => reject(err)
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
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
          }
        });
      }
    );
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  package_detail() {
    this.props.navigation.navigate("PackageDetail", {
      startingPointName        : this.state.startingPointName,
      latitute_starting_point  : this.state.start.latitude,
      longitude_starting_point : this.state.start.longitude,
      destinationName          : this.state.destinationName,
      latitude_destination     : this.state.start.latitude,
      longitude_destination    : this.state.start.longitude
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
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
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

    // remove the prediction dropdown
    this.setState({
      startingPredictions: []
    });
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
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
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
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

    // remove the prediction dropdown
    this.setState({
      destinationPredictions: []
    });
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
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
        {this.state.region['latitude'] ?
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={map => this._map = map}
              style={styles.map}
              customMapStyle={ RetroMapStyles }
              region={this.state.region}
              onRegionChangeComplete={(reg) => this.onMapRegionChange(reg)}
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
              {/* --- Shipment list --- */}
              {this.state.start['latitude'] && this.state.destination['latitude'] ?
                <TouchableOpacity style={styles.styletouchable} onPress={this.package_detail.bind(this)}>
                  <Icon style={[styles.imageButton, {backgroundColor: 'tomato'}, {color: 'white'}]} size={25} name={'done'}/>
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
    paddingVertical: 8,
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
  }
});