import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';

export default class PackageDetail extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state = {
      startingPointName        : state.params.startingPointName,
      latitute_starting_point  : state.params.latitute_starting_point,
      longitude_starting_point : state.params.longitude_starting_point,
      destinationName          : state.params.destinationName,
      latitude_destination     : state.params.latitude_destination,
      longitude_destination    : state.params.longitude_destination,
      weight                   : "",
      space                    : "",
      phoneOfReceiver          : ""
    };

    this.chooseShipment.bind(this)
  }

  chooseShipment = async()=>{
    // Send shipment
    this.props.navigation.navigate("ShipmentList", {
        startingPointName        : this.state.startingPointName,
        latitute_starting_point  : this.state.latitute_starting_point,
        longitude_starting_point : this.state.longitude_starting_point,
        destinationName          : this.state.destinationName,
        latitude_destination     : this.state.latitude_destination,
        longitude_destination    : this.state.longitude_destination,
        weight                   : this.state.weight,
        space                    : this.state.space,
        phoneOfReceiver          : this.state.phoneOfReceiver,
        package_id               : null
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Route:{"\n"}</Text>
          <Text style={{fontSize: 14}}>{this.state.startingPointName}</Text>
          <Text style={[{fontSize: 17}, {fontWeight: "bold"}]}>{"\n"}--> </Text> 
          <Text style={{fontSize: 14}}>{this.state.destinationName}{"\n"}</Text> 
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Weight (kg):           </Text>
          <TextInput style={styles.inputBox}
            onChangeText={(weight) => this.setState({weight})}
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Weight capacity"
            placeholderTextColor = "#002f6c"
            selectionColor="#fff"
            keyboardType="numeric"/>
        </View>
          
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Space (m^3):         </Text>
          <TextInput style={styles.inputBox}
            onChangeText={(space) => this.setState({space})}
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Space capacity"
            placeholderTextColor = "#002f6c"
            selectionColor="#fff"
            keyboardType="numeric"/>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Phone of receiver:</Text>
          <TextInput style={styles.inputBox}
            onChangeText={(phoneOfReceiver) => this.setState({phoneOfReceiver})}
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Phone of receiver"
            placeholderTextColor = "#002f6c"
            selectionColor="#fff"
            keyboardType="numeric"/>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.chooseShipment}>Find Shipment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  inputBox: {
    width: 150,
    height: 40,
    backgroundColor: '#eeeeee', 
    borderRadius: 20,
    fontSize: 15,
    color: '#002f6c',
    marginVertical: -10,
    marginLeft: 20,
    textAlign: 'center'
  },
  button: {
    width: 280,
    backgroundColor: 'tomato',
    borderRadius: 25,
    paddingVertical: 10,
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});