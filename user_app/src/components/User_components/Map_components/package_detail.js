import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';

export default class PackageDetail extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state ={
      route             : state.params.route,
      startingPointName : state.params.startingPointName,
      destinationName   : state.params.destinationName,
      weightCapacity    : 0,
      spaceCapacity     : 0,
    };

    this.sendToServer.bind(this)
  }

  sendToServer = async()=>{
    // Send shipment
    console.log("Send to server shipment controller")
    this.props.navigation.navigate("ShipmentList", {
        startingPointName: this.state.startingPointName,
        destinationName:   this.state.destinationName
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Route:{"\n"}{"\n"}</Text>
          <Text style={{fontSize: 14}}>{this.state.startingPointName}</Text>
          <Text style={[{fontSize: 17}, {fontWeight: "bold"}]}>{"\n"}--> </Text> 
          <Text style={{fontSize: 14}}>{this.state.destinationName}</Text> 
        </Text>
    
        <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>{"\n"}Weight capacity: (Kg)</Text>
        <TextInput style={styles.inputBox}
          onChangeText={(weightCapacity) => this.setState({weightCapacity})}
          underlineColorAndroid='rgba(0,0,0,0)' 
          placeholder="Weight capacity"
          placeholderTextColor = "#002f6c"
          selectionColor="#fff"
          keyboardType="numeric"/>
          
        <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Space capacity: (m^3)</Text>
        <TextInput style={styles.inputBox}
          onChangeText={(spaceCapacity) => this.setState({spaceCapacity})}
          underlineColorAndroid='rgba(0,0,0,0)' 
          placeholder="Space capacity"
          placeholderTextColor = "#002f6c"
          selectionColor="#fff"
          keyboardType="numeric"/>
        

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
    width: 350,
    backgroundColor: '#eeeeee', 
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10
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