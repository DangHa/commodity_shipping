import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, AsyncStorage} from 'react-native';

export default class ShipmentForm extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state ={
      route             : state.params.route,
      startingPointName : state.params.startingPointName,
      destinationName   : state.params.destinationName
    };

    this.sendToServer.bind(this)
  }

  sendToServer = async()=>{
    // Send shipment
    console.log("Send to server shipment controller")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.startingPointName} --> {this.state.destinationName}</Text>

        <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.sendToServer}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  button: {
      width: 280,
      backgroundColor: '#4f83cc',
      borderRadius: 25,
      paddingVertical: 10,
  },
  buttonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  }
});