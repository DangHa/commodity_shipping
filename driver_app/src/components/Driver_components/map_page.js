import React, { Component } from 'react';
import {StyleSheet, View, Platform, TextInput, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Get location 
export const getLocation = () => {
  return new Promise(
      (resolve, reject) => {
          Geolocation.getCurrentPosition(
              (data) => resolve(data.coords),
              (err) => reject(err)
          );
      }
  );
}

export const geocodeLocationByName = (locationName) => {
  return new Promise(
      (resolve, reject) => {
        Geolocation.from(locationName)
              .then(json => {
                  const addressComponent = json.results[0].address_components[0];
                  resolve(addressComponent);
              })
              .catch(error => reject(error));
      }
  );
}

export const geocodeLocationByCoords = (lat, long) => {
  return new Promise(
      (resolve, reject) => {
        Geolocation.from(lat, long)
              .then(json => {
                  const addressComponent = json.results[0].address_components[0];
                  resolve(addressComponent);
              })
              .catch(error => reject(error));
      }
  );
}

// // Map Input
// function MapInput(props){
//   return (
//       <GooglePlacesAutocomplete
//         placeholder='Search'
//         minLength={2} // minimum length of text to search
//         autoFocus={false}
//         returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//         keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
//         listViewDisplayed='auto'    // true/false/undefined
//         fetchDetails={true}
//         renderDescription={row => row.description} // custom description render
//         onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//           console.log(data, details);
//           //props.notifyChange(details.geometry.location);
//         }}

//         getDefaultValue={() => ''}

//         query={{
//           // available options: https://developers.google.com/places/web-service/autocomplete
//           key: 'AIzaSyDI3l4n3NL_KbvvLtO8DuSfl4mImgrANoM',
//           language: 'en', // language of the results
//           types: '(cities)' // default: 'geocode'
//         }}

//         styles={styles.inputBox}
//       />
//   );
// }

export default class Map extends Component {
  state = {
    region: {},
    start : "",
    destination: "",
    predictions: []
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

  // getCoordsFromName(loc) {
  //   console.lof(loc)
  //   this.setState({
  //     region: {
  //         latitude: loc.lat,
  //         longitude: loc.lng,
  //         latitudeDelta: 0.003,
  //         longitudeDelta: 0.003
  //     }
  //   });
  // }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  // Text 
  onPressStartingPoint(id) {
    console.log("title pressed");
    this.setState({start});
    // from id find coordinate put in start and regoin. create a marker
  };

  async onChangeStart(start){    
    const apiKey = "AIzaSyDI3l4n3NL_KbvvLtO8DuSfl4mImgrANoM"
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${start}&location=${this.state.region.latitude}, ${this.state.region.longitude}&radius=20000`;
    
    try {
      const result = await fetch(apiUrl)
      const json = await result.json();
      console.log(json);
      this.setState({
        predictions: json.predictions
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const predictions = this.state.predictions.map(prediction => (
      <Text style={styles.suggestions} key={prediction.id} onPress={(id) => this.onPressStartingPoint(id)}>
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
              region={this.state.region}
              onRegionChange={(reg) => this.onMapRegionChange(reg)}
              showsUserLocation={true}>
            </MapView>
            <TextInput style={styles.inputBox}
              onChangeText={(start) => this.onChangeStart(start)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Starting point"
              selectionColor="#fff"
              keyboardType="default"
              onSubmitEditing={()=> this.password.focus()}/>
            {/* <TextInput style={styles.inputBox}
              onChangeText={(start) => this.onChangeStart(start)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Destination"
              selectionColor="#fff"
              keyboardType="default"
              onSubmitEditing={()=> this.password.focus()}/> */}
              {predictions}
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
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#002f6c',
    marginVertical: 7,
    marginLeft: 20
  },
  suggestions: {
    width: 370,
    marginLeft: 20,
    backgroundColor: 'white',
    padding: 5,
    fontSize: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.7,
    marginLeft: 20,
  }
});