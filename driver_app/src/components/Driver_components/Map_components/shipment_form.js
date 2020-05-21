import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import { DatePicker, Picker, Item } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ShipmentForm extends Component {
  constructor(props) {
    super(props);

    const {state} = this.props.navigation;

    this.state ={
      route                   : state.params.route,
      startingPointName       : state.params.startingPointName,
      latitute_starting_point : state.params.latitute_starting_point,
      longitude_starting_point: state.params.longitude_starting_point,
      destinationName         : state.params.destinationName,
      latitude_destination    : state.params.latitude_destination,
      longitude_destination   : state.params.longitude_destination,
      length                  : state.params.length,
      weightCapacity          : 0,
      spaceCapacity           : 0,
      startingTime            : new Date(),
      typeOfCar_id            : "1",
      fee                     : 100,
      passedBOT               : [],

      showDetailFee           : false
    };

    this.sendToServer.bind(this)
    this.componentDidMount.bind(this)
    this.setDate = this.setDate.bind(this);
  }

  async componentDidMount(){
    // Get fee and BOTPassed
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        typeOfCar_id   : this.state.typeOfCar_id,
        roadDescription: this.state.route.coordinates,
        length         : this.state.length,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/bot/getFeeAndBOTPassed', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    if (result.hasOwnProperty('fee')){
      this.setState({ fee: result.fee });
      this.setState({ passedBOT: result.passedBOT });
    } else {
      alert("There are something wrong")
    }
  }

  sendToServer = async()=>{
    let phone = await AsyncStorage.getItem('userPhone');

    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        phone                   : phone,
        typeOfCar_id            : this.state.typeOfCar_id,
        startingDate            : this.state.startingTime,
        weightCapacity          : this.state.weightCapacity,
        spaceCapacity           : this.state.spaceCapacity,
        startingPointName       : this.state.startingPointName,
        latitute_starting_point : this.state.latitute_starting_point,
        longitude_starting_point: this.state.longitude_starting_point,
        destinationName         : this.state.destinationName,
        latitude_destination    : this.state.latitude_destination,
        longitude_destination   : this.state.longitude_destination,
        roadDescription         : this.state.route.coordinates,
        length                  : this.state.length,
        fee                     : this.state.fee,
        passedBOT               : this.state.passedBOT, 
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/shipments/createNewShipment', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    if (result === true){
      alert("You have created a new shipment. Now you can see it on the shipment list");
      this.props.navigation.navigate("MapHome")
    } else {
      alert("There are something wrong")
    }
  }

  //Date picker 
  setDate(newDate) {
    this.setState({ startingTime: newDate });
  }

  // to fix error of dropdown
  componentDidUpdate(pP, pS, sS) {
    if (pS.typeOfCar_id !== this.state.typeOfCar_id){
      this.componentDidMount()
    }
  }

  render() {
    const BOT_infor = this.state.passedBOT.map((bot) => {
      return (
        <View style={[{ paddingLeft: 15, paddingBottom: 10 }]}>
          <Text style={[{fontSize: 12, fontStyle: "italic"}]}>{bot.start_toll.name} --> {bot.end_toll.name}: {bot.fee}.000 (vnd)</Text>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        <Text>
          <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Route:{"\n"}</Text>
          <Text style={{fontSize: 14}}>{this.state.startingPointName}</Text>
          <Text style={[{fontSize: 17}, {fontWeight: "bold"}]}>{"\n"}--> </Text> 
          <Text style={{fontSize: 14}}>{this.state.destinationName}</Text> 
        </Text>

        <View style={[{flexDirection:"row", marginVertical:5}]}>
          <Text style={{ flex: 1}}>
            <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Fee:  </Text>
            <Text style={{fontSize: 14}}>{this.state.fee}.000 (vnd)</Text>
          </Text>

          <View style={{ flex: 0, paddingRight: 100}}>
            <TouchableOpacity onPress={() => this.setState({showDetailFee: !this.state.showDetailFee})}> 
              <Icon style={{color: '#1565c0'}} size={25} name={'expand-more'}/>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.showDetailFee ?
          <View>
            {BOT_infor}
            <View style={[{ paddingLeft: 15, paddingBottom: 10 }]}>
              <Text style={[{fontSize: 12}]}>- Gasoline expenditure: {parseInt(this.state.length/100*10 * 15000)} (vnd) -- length: {parseInt(this.state.length)} (km)</Text>
            </View>
          </View>
        : null}

        <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>Weight capacity: (Kg)</Text>
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
            onValueChange={(item) => {this.setState({ typeOfCar_id: item });}}
          >
            <Picker.Item label="Xe dưới 12 ghế ngồi, xe tải có tải trọng dưới 2 tấn; các loại xe buýt vận tải khách công cộng" value="1" />
            <Picker.Item label="Xe từ 12 ghế ngồi đến 30 ghế; xe tải có tải trọng từ 2 tấn đến dưới 4 tấn" value="2" />
            <Picker.Item label="Xe từ 31 ghế ngồi trở lên; xe tải có tải trọng từ 4 tấn đến dưới 10 tấn" value="3" />
            <Picker.Item label="Xe tải có tải trọng từ 10 tấn đến dưới 18 tấn; xe chở hàng bằng container 20 fit" value="4" />
            <Picker.Item label="Xe tải có tải trọng từ 18 tấn trở lên; xe chở hàng bằng container 40 fit" value="5" />
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