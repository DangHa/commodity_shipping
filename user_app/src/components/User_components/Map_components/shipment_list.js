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
      }
    };
  }

  componentDidMount() {

  }


  onMapRegionChange(region) {
    console.log(region)
    this.setState({ region });
  }

  requestShipmentForPackage(item){
    console.log("SEND TO SERVER FOR CONNECT")

    this.props.navigation.navigate("MapHome")
  }

  render() {
    return(
      <View style={styles.flatview}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text style={styles.route}>{this.props.item.id}</Text>
            <Text style={styles.date}>{this.props.item.title}</Text>
          </View>

          <View style={{ flex: 0}}>
            <TouchableOpacity onPress={() => this.setState({showChildList: !this.state.showChildList})}> 
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
              onRegionChangeComplete={(reg) => this.onMapRegionChange(reg)}>
              
              {this.props.item.markers.map(marker => (
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
                <Text style={styles.date}>Price: </Text>
                <Text style={styles.date}>Starting Date:</Text>
              </View>

              <View style={{ flex: 0, paddingRight: 15}}>
                <TouchableOpacity style={styles.button} onPress={this.requestShipmentForPackage.bind(this, this.props.item)}> 
                  <Text style={styles.buttonText}>
                    Choose 
                  </Text>
                  {/* <Icon style={{color: 'tomato'}} size={30} name={'check-circle'}/> */}
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
      startingPointName : state.params.startingPointName,
      destinationName   : state.params.destinationName,
      weight            : "",
      space             : "",
      phoneOfReceiver   : "",
      suggested_shipments: []
    };

  }

  async componentDidMount() {

    console.log("get data of user from serve");

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
    
    
    console.log("data:  ", result)
    if (result.length !== 0){
      this.setState({suggested_shipments: result[0]})
    } else {
      alert("There are something wrong")
    }

    // need to fix the data of table again (need marker)

    this.setState({
      suggested_shipments: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          markers: [
            {  
              title: "Start",
              description: "Bach khoa",
              coordinate: {
                latitude: 21.0042737,
                longitude: 105.8415019,
              }
            },
            {
              title: "Destination",
              description: "Ga Ha Noi",
              coordinate: {
                latitude: 21.0250615,
                longitude: 105.8411814,
              }
            }
          ]
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          markers: [
            {
              title: "Start",
              description: "Ga Ha Noi",
              coordinate: {
                latitude: 21.0250615,
                longitude: 105.8411814,
              }
            },
            {  
              title: "Destination",
              description: "Bach khoa",
              coordinate: {
                latitude: 21.0042737,
                longitude: 105.8415019,
              }
            }
          ]
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          markers: [
            {  
              title: "Start",
              description: "Bach khoa",
              coordinate: {
                latitude: 21.0042737,
                longitude: 105.8415019,
              }
            },
            {
              title: "Destination",
              description: "Ga Ha Noi",
              coordinate: {
                latitude: 21.0250615,
                longitude: 105.8411814,
              }
            }
          ]
        },
      ]
    })
  }

  PriceLowToHigh() {
    console.log("Send to server to get ranking of price")
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{ flexDirection:"row" }}>
          <TouchableOpacity style={[styles.button, {width: 200}]} onPress={this.PriceLowToHigh.bind(this)}> 
            <Text style={styles.buttonText}>Price: Low to high</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.suggested_shipments}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <Shipment {...this.props} item = {item}/>
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
  route: {
    fontFamily: 'Verdana',
    fontSize: 16
  },
  date: {
    color: 'gray'
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