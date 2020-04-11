import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapViewDirections from "react-native-maps-directions";

import RetroMapStyles from '../../assets/RetroMapStyles'

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
      route: {},
      // origin: {latitude: 21.0250615, longitude: 105.8389873} // test direction
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
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
          }
        });
      }
    );
  }

  onMapRegionChange(region) {
    this.setState({ region });
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
      route: {}
    })
  }

  // --- Starting textinput
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
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
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

    // trigger drawing polyline (route)
    
    this.setState({
      route: {
        coordinates: [
          { latitude: this.state.region.latitude, longitude: this.state.region.longitude },
          { latitude: this.state.start.latitude, longitude: this.state.start.longitude }
        ]
      }
    });
    

    console.log(this.state.route)
  };

  async onChangeStart(start){  
    this.setState({
      startingPointName: start
    })
    
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAP_APIKEY}&input=${start}&location=${this.state.region.latitude}, ${this.state.region.longitude}&radius=20000`;
    
    // get prediction from google api
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

  // --- Destination textinput
  async onPressDestination(prediction) {
    const placeid = prediction.place_id
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${GOOGLE_MAP_APIKEY}`;
    
    // get coordinate from place id
    var description = {}
    try {
      const result = await fetch(apiUrl)
      const json = await result.json();
      
      if(json['result']){
        description = {
          latitude: json.result.geometry.location.lat,
          longitude: json.result.geometry.location.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }
      }else {
        description = this.state.region
      }
      
      
    } catch (err) {
      console.error(err)
    }

    // change the region on map and starting point
    this.setState({
      region: description
    });
    this.setState({
      description: description
    });
    this.setState({
      destinationName: prediction.description
    })

    // remove the prediction dropdown
    this.setState({
      destinationPredictions: []
    });

    // trigger drawing polyline (route)
    if(this.state.start['latitude']){
      this.setState({
        route: {
          coordinates: [
            { latitude: this.state.start.latitude, longitude: this.state.start.longitude },
            { latitude: this.state.destination.latitude, longitude: this.state.destination.longitude }
          ]
        }
      });
    }

    console.log(this.state.route)
  };

  async onChangeDestination(destination){  
    this.setState({
      destinationName: destination
    })
    
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAP_APIKEY}&input=${destination}&location=${this.state.region.latitude}, ${this.state.region.longitude}&radius=20000`;
    
    // get prediction from google api
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
              {this.state.start['latitude'] ?
                <MapView.Marker
                  draggable
                  coordinate={{
                    latitude:  this.state.start.latitude,
                    longitude: this.state.start.longitude
                  }}
                  title={"Starting point"}
                  description={this.state.startingPointName}
                />
              : null}
              {this.state.destination['latitude'] ?
                <MapView.Marker
                  draggable
                  // onDragEnd={(t, map, coords) => this.setDestination(coords)}
                  coordinate={{
                    latitude:  this.state.destination.latitude,
                    longitude: this.state.destination.longitude
                  }}
                  title={"Destination"}
                  description={this.state.destinationName}
                />
              : null}

              {/* --- Route --- */}
              {this.state.route['coordinates'] ?
                <MapViewDirections
                  origin      = {this.state.origin}
                  destination = {this.state.route.coordinates[1]}
                  apikey      = {GOOGLE_MAP_APIKEY}
                  strokeWidth = {3}
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
              <TouchableOpacity onPress={this.currentLocation.bind(this)}>
                <Icon style={styles.imageButton} size={25} name={'my-location'}/>
              </TouchableOpacity>
                {/* --- Route --- */}
                {/* {this.state.route['coordinates'] ?
                  <Icon style={styles.imageStyle} size={15} name={'my-location'} />
                : null} */}
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
    backgroundColor: '#F5F0F0',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginLeft: 350
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