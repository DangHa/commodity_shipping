import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import { DatePicker, Picker, Item } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ShipmentForm extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state ={
      route                   : state.params.route,
      startingPointName       : state.params.startingPointName,
      latitute_starting_point : state.params.destinationName,
      longitude_starting_point: state.params.destinationName,
      destinationName         : state.params.destinationName,
      latitude_destination    : state.params.destinationName,
      longitude_destination   : state.params.destinationName,
      length                  : 100,
      weightCapacity          : 0,
      spaceCapacity           : 0,
      startingTime            : new Date(),
      typeOfCar_id            : "1",
    };

    this.sendToServer.bind(this)
    this.setDate = this.setDate.bind(this);
  }

  sendToServer = async()=>{
    // Send shipment
    console.log("Send to server shipment controller")
    console.log(this.state)
  }

  //Date picker 
  setDate(newDate) {
    this.setState({ startingTime: newDate });
  }

  // DropDown
  chooseTypeOfCar(value) {
    this.setState({ typeOfCar_id: value });
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

        <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Type of car</Text>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="expand-more" />}
            style={{ width: undefined }}
            placeholder="Select your type of car"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.typeOfCar_id}
            onValueChange={this.chooseTypeOfCar.bind(this)}
          >
            <Picker.Item label="Xe dưới 12 ghế ngồi, xe tải có tải trọng dưới 2 tấn; các loại xe buýt vận tải khách công cộng" value="0" />
            <Picker.Item label="Xe từ 12 ghế ngồi đến 30 ghế; xe tải có tải trọng từ 2 tấn đến dưới 4 tấn" value="1" />
            <Picker.Item label="Xe từ 31 ghế ngồi trở lên; xe tải có tải trọng từ 4 tấn đến dưới 10 tấn" value="2" />
            <Picker.Item label="Xe tải có tải trọng từ 10 tấn đến dưới 18 tấn; xe chở hàng bằng container 20 fit" value="3" />
            <Picker.Item label="Xe tải có tải trọng từ 18 tấn trở lên; xe chở hàng bằng container 40 fit" value="4" />
          </Picker>
        </Item>

        <View style={[{flexDirection:"row"}]}>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>{"\n"}Time of departure:</Text>
          <View style={[{marginVertical:10}]}>
            <DatePicker
              defaultDate={this.state.startingTime}
              minimumDate={new Date(2020, 1, 1)}
              maximumDate={new Date(2020, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Click here to select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "green" }}
              onDateChange={this.setDate}
              disabled={false}
              />
          </View>          
        </View>
        <Text style={[{fontSize: 12, marginVertical:-15}]}>After this time, you won't receive any package's request any more </Text>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.sendToServer}>Create New Shipment</Text>
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