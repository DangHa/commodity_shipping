import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Package extends Component{
  constructor(props) {
    super(props);

    this.state = {};
  }

  async acceptPackage(item) {
    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        package_id: item.package_id,
        status: "accepted"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/package/updatePackageStatus', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    if (result === true){
      alert("A package has been accpected by you")
      this.props.resetShipment()
      this.props.resetPackage()
    } else {
      alert("There are something wrong")
    }
  }

  async refusePackage(item) {
    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        package_id: item.package_id,
        status: "refused"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/package/updatePackageStatus', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
    
    if (result === true){
      alert("A package has been refused by you")
      this.props.resetShipment()
      this.props.resetPackage()
    } else {
      alert("There are something wrong")
    }
  }

  render() {
    return(
      <View style={styles.childFlatView}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text>
              <Text style={styles.major}>{this.props.item.starting_point}</Text>
              <Text style={[{fontSize: 17}, {fontWeight: "bold"}]}>{"\n"}--> </Text> 
              <Text style={styles.major}>{this.props.item.destination}</Text>
            </Text>
            
            <Text style={styles.minor}>Phone of sender: {this.props.item.phone}</Text>
            <Text style={styles.minor}>Phone of reciever: {this.props.item.phone_of_receiver}</Text>
            <Text style={styles.minor}>Weight: {this.props.item.weight} (kg)</Text>
            <Text style={styles.minor}>Space: {this.props.item.space} (m^3)</Text>
            <Text style={styles.minor}>Price: {this.props.item.price}.000 (vnd)</Text>
          </View>

          { this.props.item.status === 'waitting' ?
            <View style={{ flex: 0, flexDirection:"row"}}>
              <TouchableOpacity onPress={this.acceptPackage.bind(this, this.props.item)}> 
                <Icon style={{color: '#1565c0'}} size={25} name={'check-circle'}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.refusePackage.bind(this, this.props.item)}> 
                <Icon style={{color: 'gray'}} size={25} name={'delete'}/>
              </TouchableOpacity>
            </View>
          : null}
          
        </View>  
      </View>
      
    )
  }
}

class Shipment extends Component{
  constructor(props) {
    super(props);

    this.state ={
      showChildList: false,
      packageList: []
    };
  }

  async getDetailShipment() {
    // Show the dropdown
    this.setState({showChildList: !this.state.showChildList})

    if (this.state.showChildList === false) {
      // Send In here
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          shipment_id: this.props.item.shipment_id,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }

      var result = await fetch('http://172.18.0.1:8080/package/getPackageByShipment', data)
              .then((response) => response.json())
              .then((json) => {
                  return json
              })
              .catch((error) => {
                  console.error(error);
              });
      
      if (result.length !== 0){
        this.setState({packageList: result})
      } else {
        this.setState({packageList: []})
      }
    }
    
  }

  render() {
    return(
      <View style={styles.flatview}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text>
              <Text style={styles.major}>{this.props.item.starting_point}</Text>
              <Text style={[{fontSize: 17}, {fontWeight: "bold"}]}>{"\n"}--> </Text> 
              <Text style={styles.major}>{this.props.item.destination}</Text>
            </Text>
            
            <Text style={styles.minor}>{this.props.item.starting_date}</Text>
          </View>

          {this.props.item.numberOfWaiter > 0 ?
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.setState(() => this.getDetailShipment())}> 
                <Text style={styles.notifyButton}>{this.props.item.numberOfWaiter}</Text>
              </TouchableOpacity>
            </View>
          : 
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.setState(() => this.getDetailShipment())}> 
                <Icon style={{color: 'grey'}} size={25} name={'expand-more'}/>
              </TouchableOpacity>
            </View>
          }

        </View>
        
        { this.state.showChildList ?
          <View>
            <View style={{ flex: 1, paddingLeft: 15}}>
              <Text style={styles.minor}>{"\n"}Type of car: {this.props.item.name}</Text>
              <Text style={styles.minor}>Weight capacity: {this.props.item.weightcapacity} (kg)</Text>
              <Text style={styles.minor}>Space capacity: {this.props.item.spacecapacity} (m^3)</Text>
              <Text style={styles.minor}>expenditure: {this.props.item.fee}.000 (vnd)</Text>

              <Text style={styles.major}>{"\n"}Package List:</Text>
            </View>

            <FlatList
              
              data={this.state.packageList}
              renderItem={({item})=>
                <Package key={item.package_id} item = {item} resetShipment = {this.props.resetShipment} resetPackage = {this.getDetailShipment.bind(this)} />
              }
              listKey={(item, index) => 'D' + index.toString()}
              keyExtractor={(item, index) => 'D' + index.toString()}/>
          </View>
        : null}
      </View>
      
    )
  }
}

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state ={
      shipments: []
    };
  }

  async componentDidMount() {
    let phone = await AsyncStorage.getItem('userPhone');

    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        phone: phone,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/shipments/getShipmentsByDriver', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
          
    if (result.length !== 0){
      this.setState({shipments: result})
    } else {
      alert("You dont have any shipment yet")
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Your Shipments {"\n"}
        </Text>
        <FlatList
          data={this.state.shipments}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <Shipment key={item.shipment_id} item = {item} resetShipment = {this.componentDidMount.bind(this)}/>
          }
          listKey={(item, index) => 'D' + index.toString()}
          keyExtractor={(item, index) => 'D' + index.toString()}
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
    borderBottomWidth: 0.8,
  },
  childFlatView: {
    width: 300,
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginLeft: 30,
    marginBottom: 3
  },
  major: {
    fontFamily: 'Verdana',
    fontSize: 15
  },
  minor: {
    color: 'gray'
  },
  notifyButton: {
    width: 30,
    height: 30,
    backgroundColor: 'tomato',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: 'white',
    fontSize: 18
  }
});