import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class ShipmentForm extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state ={
      route             : state.params.route,
      startingPointName : state.params.startingPointName,
      destinationName   : state.params.destinationName,
      weightCapacity    : 0,
      spaceCapacity     : 0,
      startingTime      : "01-04-2020",
    };

    this.sendToServer.bind(this)
  }

  sendToServer = async()=>{
    // Send shipment
    console.log("Send to server shipment controller")
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Route:{"\n"}</Text>
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

        <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>{"\n"}Time of departure:</Text>
    <Text style={[{fontSize: 14}]}>After this time, you won't receive any package's request any more {"\n"}</Text>
        
        <View style={{alignItems: 'center'}}>
          <DatePicker
            style={{width: 250}}
            date={this.state.startingTime} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-04-2020"
            maxDate="01-01-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                backgroundColor: '#eeeeee', 
                borderRadius: 25,
                paddingHorizontal: 16,
                fontSize: 16,
                color: '#002f6c',
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({startingTime: date})}}
          />
        </View>
        

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.sendToServer}>Done</Text>
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
    backgroundColor: '#1565c0',
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