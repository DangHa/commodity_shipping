import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Package extends Component{
  constructor(props) {
    super(props);

    this.state ={
      showChildList: false,
      packageDetail: []
    };
  }

  async getDetailPackage() {
    // Show the dropdown
    this.setState({showChildList: !this.state.showChildList})

    if (this.state.showChildList === false) {
      // Send In here
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          package_id: this.props.item.package_id,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }

      var result = await fetch('http://172.18.0.1:8080/package/getPackageDetail', data)
              .then((response) => response.json())
              .then((json) => {
                  return json
              })
              .catch((error) => {
                  console.error(error);
              });
            
      if (result.length !== 0){
        this.setState({packageDetail: result[0]})
      } else {
        alert("There are something wrong")
      }
    }
    
  }

  requestShipmentForPackage(item){
    this.props.navigation.navigate("ShipmentList", {
      startingPointName        : item.starting_point,
      latitute_starting_point  : this.state.packageDetail.latitude_starting_point,
      longitude_starting_point : this.state.packageDetail.longitude_starting_point,
      destinationName          : item.destination,
      latitude_destination     : this.state.packageDetail.latitude_destination,
      longitude_destination    : this.state.packageDetail.longitude_destination,
      weight                   : this.state.packageDetail.weight,
      space                    : this.state.packageDetail.space,
      phoneOfReceiver          : this.state.packageDetail.phone_of_receiver,
      package_id               : this.state.packageDetail.package_id
    });
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
            
            <Text style={styles.minor}>{this.props.item.status}</Text>
          </View>

          {this.props.item.status === 'refused' ?
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.getDetailPackage()}> 
                <Icon style={{color: '#1565c0'}} size={25} name={'error'}/>
              </TouchableOpacity>
            </View>
          : 
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.getDetailPackage()}> 
                <Icon style={{color: 'grey'}} size={25} name={'expand-more'}/>
              </TouchableOpacity>
            </View>
          }

        </View>
        
        { this.state.showChildList ?
          <View>
            <View style={{ flexDirection:"row"}}>
              <View style={{ flex: 1, paddingLeft: 15}}>
                <Text style={{fontSize: 15}}>{"\n"}Price: {this.state.packageDetail.price}.000 (vnd)</Text>
                <Text style={{fontSize: 15}}>Weight: {this.state.packageDetail.weight} (kg)</Text>
                <Text style={{fontSize: 15}}>Space: {this.state.packageDetail.space} (m^3)</Text>
                <Text style={{fontSize: 15}}>Phone of Receiver: {this.state.packageDetail.phone_of_receiver}</Text>
                <Text style={{fontSize: 15}}>Starting date: {this.state.packageDetail.starting_date}</Text>
                <Text style={{fontSize: 15}}>Phone of Driver: {this.state.packageDetail.phone}</Text>
              </View>
            </View>
            {this.props.item.status === 'refused' ?
              <View style={{alignItems: 'center', padding:5}}>
                <TouchableOpacity style={styles.button} onPress={this.requestShipmentForPackage.bind(this, this.props.item)}> 
                  <Text style={styles.buttonText}>
                    Choose another shipment
                  </Text>
                  {/* <Icon style={{color: 'tomato'}} size={30} name={'check-circle'}/> */}
                </TouchableOpacity>
              </View>
            : null} 
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
      packages: []
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

    var result = await fetch('http://172.18.0.1:8080/package/getPackageByPhone', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });
          
    if (result.length !== 0){
      this.setState({packages: result})
    } else {
      alert("You dont have any package yet")
    }
  }

  willFocus = this.props.navigation.addListener(
    'willFocus', () => {this.componentDidMount()}
  );

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Your Packages {"\n"}
        </Text>
        <FlatList
          data={this.state.packages}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <Package {...this.props} item = {item}/>
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
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'tomato'
  },
  flatview: {
    width: 350,
    justifyContent: 'center',
    paddingTop: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.8,
  },
  childFlatView: {
    width: 250,
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginLeft: 30
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
    width: 200,
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