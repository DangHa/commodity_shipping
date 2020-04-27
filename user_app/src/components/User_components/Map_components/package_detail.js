import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';

export default class PackageDetail extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state = {
      startingPointName : state.params.startingPointName,
      destinationName   : state.params.destinationName,
      weight            : "",
      space             : "",
      phoneOfReceiver   : ""
    };

    this.sendToServer.bind(this)
  }

  sendToServer = async()=>{
    // Send shipment
    this.props.navigation.navigate("ShipmentList", {
        startingPointName: this.state.startingPointName,
        destinationName  : this.state.destinationName,
        weight           : this.state.weight,
        space            : this.state.space,
        phoneOfReceiver  : this.state.phoneOfReceiver
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
            <Text style={styles.buttonText} onPress={this.sendToServer}>Find Shipment</Text>
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