import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import RetroMapStyles from '../../../assets/RetroMapStyles'

class Shipment extends Component{
  constructor(props) {
    super(props);

    this.state ={
      showChildList: false,
      region: {
        latitude: 21.0042737,
        longitude: 105.8415019,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      markers: [
        {
          "title": "Start",
          "description": "",
          "coordinate": {
            "latitude": 21.0250615,
            "longitude": 105.8411814,
          }
        },
        {  
          "title": "Destination",
          "description": "",
          "coordinate": {
            "latitude": 21.0042737,
            "longitude": 105.8415019,
          }
        }
      ],
      typeOfCar: ""
    };
  }

  async requestShipmentForPackage(item){
    let userphone = await AsyncStorage.getItem('userPhone');

    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        shipment_id               : item.shipment_id,
        userphone                 : userphone,
        startingPointName         : this.props.startingPointName,
        latitute_starting_point   : this.props.latitute_starting_point,
        longitude_starting_point  : this.props.longitude_starting_point,
        destinationName           : this.props.destinationName,
        latitude_destination      : this.props.latitude_destination,
        longitude_destination     : this.props.longitude_destination,
        weight                    : this.props.weight,
        space                     : this.props.space,
        phoneOfReceiver           : this.props.phoneOfReceiver,
        price                     : this.props.item.price,
        package_id                : this.props.package_id
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
  
    var result = await fetch('http://172.18.0.1:8080/package/createNewPackage', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    
    if (result === true ){
      alert("Your request has been sent. Now you can see it in your package list !")
    } else {
      alert("There are something wrong")
    }

    if (this.props.package_id === null) {
      this.props.navigation.navigate("MapHome")
    }else{
      this.props.navigation.navigate("History")
    }
    
  }

  async getShipmentDetail(shipment_id){
    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        shipment_id: shipment_id,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
  
    var result = await fetch('http://172.18.0.1:8080/shipments/getShipmentDetail', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    
    if (result.length !== 0){
      this.setState({
        markers: [
          {
            "coordinate": {
              "latitude": parseFloat(result[0].latitude_starting_point), 
              "longitude": parseFloat(result[0].longitude_starting_point)
            }, 
            "description": result[0].starting_point, 
            "title": "Start",
          }, 
          {
            "coordinate": {
              "latitude": parseFloat(result[0].latitude_destination),
              "longitude": parseFloat(result[0].longitude_destination)
            },
            "description": result[0].destination,
            "title": "Destination",
          }
        ]
      })
      this.setState({
        typeOfCar: result[0].name,
      })

    } else {
      alert("There are something wrong")
    }

    this.setState({
      region: {
        latitude: parseFloat(result[0].latitude_starting_point),
        longitude: parseFloat(result[0].longitude_starting_point),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
    })

    this.setState({showChildList: !this.state.showChildList})
  }

  render() {
    return(
      <View style={styles.flatview}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text style={styles.major}>{this.props.item.starting_date}</Text>

            <Text>
              <Text style={styles.minor}>  {this.props.item.starting_point}</Text>
              <Text style={[{fontSize: 16}, {fontWeight: "bold"}]}>{"\n"}--> </Text> 
              <Text style={styles.minor}>{this.props.item.destination}</Text>
            </Text>  
          </View>

          <View style={{ flex: 0}}>
            <TouchableOpacity onPress={() => this.getShipmentDetail(this.props.item.shipment_id)}> 
              <Icon style={{color: 'grey'}} size={25} name={'expand-more'}/>
            </TouchableOpacity>
          </View>
        </View>
        
        { this.state.showChildList ?
          <View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={ RetroMapStyles }
              region={this.state.region}
              onRegionChangeComplete={(reg) => this.setState({ region: reg })}>
              
              {this.state.markers.map(marker => (
                <MapView.Marker 
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
            
              {/* Need to draw a route */}
            </MapView>

            <Text></Text>
            <View style={{ flexDirection:"row", paddingBottom: 10}}>
              <View style={{ flex: 1, paddingLeft: 10}}>
                <Text style={{fontSize: 15}}>Type of car: {this.state.typeOfCar}</Text>
                <Text style={{fontSize: 15}}>Price: {this.props.item.price}</Text>
              </View>

              <View style={{ flex: 0, paddingRight: 15}}>
                <TouchableOpacity style={styles.button} onPress={this.requestShipmentForPackage.bind(this, this.props.item)}> 
                  <Text style={styles.buttonText}>
                    Choose 
                  </Text>
                </TouchableOpacity>
              </View>
                

            </View>
          </View>
        : null}
      </View>
      
    )
  }
}

export default class History extends Component {
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
      weight                   : state.params.weight,
      space                    : state.params.space,
      phoneOfReceiver          : state.params.phoneOfReceiver,
      package_id               : state.params.package_id,
      suggested_shipments      : []
    };

  }

  async componentDidMount() {
    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        startingPointName: this.state.startingPointName,
        destinationName  : this.state.destinationName,
        weight           : this.state.weight,
        space            : this.state.space
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
  
    var result = await fetch('http://172.18.0.1:8080/shipments/getSuggestedShipment', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    
    if (result.length !== 0){
      this.setState({suggested_shipments: result})
    } else {
      alert("There are something wrong")
    }
  }

  render() {
    return (
      <View style={styles.container} >
      
        <FlatList
          data={this.state.suggested_shipments}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <Shipment {...this.props} 
                      item                      = {item} 
                      startingPointName         = {this.state.startingPointName}
                      latitute_starting_point   = {this.state.latitute_starting_point}
                      longitude_starting_point  = {this.state.longitude_starting_point}
                      destinationName           = {this.state.destinationName}
                      latitude_destination      = {this.state.latitude_destination}
                      longitude_destination     = {this.state.longitude_destination}
                      weight                    = {this.state.weight}
                      space                     = {this.state.space}
                      phoneOfReceiver           = {this.state.phoneOfReceiver}
                      package_id                = {this.state.package_id}/>

          }
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: 300,
    height: 250,
    marginLeft: 25
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565c0'
  },
  flatview: {
    width: 350,
    justifyContent: 'center',
    paddingTop: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  major: {
    fontFamily: 'Verdana',
    fontSize: 16
  },
  minor: {
    color: 'gray',
    fontSize: 15
  },
  button: {
    width: 60,
    backgroundColor: 'tomato',
    borderRadius: 20,
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});