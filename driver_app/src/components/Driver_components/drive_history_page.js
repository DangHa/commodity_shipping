import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Package extends Component{
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <View style={styles.childFlatView}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text style={styles.route}>{this.props.item.name}</Text>
            <Text style={styles.date}>{this.props.item.date}</Text>
          </View>

          <View style={{ flex: 0, flexDirection:"row"}}>
            <TouchableOpacity> 
              <Icon style={{color: '#1565c0'}} size={25} name={'check-circle'}/>
            </TouchableOpacity>
            <TouchableOpacity> 
              <Icon style={{color: 'gray'}} size={25} name={'delete'}/>
            </TouchableOpacity>
          </View>
        </View>  
      </View>
      
    )
  }
}

class Shipment extends Component{
  constructor(props) {
    super(props);

    this.state ={
      childList: true
    };
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
            <TouchableOpacity> 
              <Icon style={{color: 'grey'}} size={25} name={'chevron-right'}/>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={this.props.item.packages}
          renderItem={({item})=>
           <Package item = {item}/>}
          keyExtractor={(item, index) => index.toString()}
        />  
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
    console.log("get data of user from serve");
    
    this.setState({
      shipments: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          packages: [
            {
              name: 'one',
              date: 'date',
              status: 'waiting for confirm'
            },
            {
              name: 'two',
              date: 'date',
              status: 'accepted'
            }
          ]
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          package: [
            {
              name: 'one',
              date: 'date',
              status: 'accepted'
            },
            {
              name: 'two',
              date: 'date',
              status: 'accepted'
            }
          ]
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ]
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Your Shipments 
        </Text>
        <FlatList
          data={this.state.shipments}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <Shipment item = {item}/>
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
    color: '#1565c0'
  },
  flatview: {
    width: 350,
    justifyContent: 'center',
    paddingTop: 20,
    borderRadius: 2,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.8,
  },
  childFlatView: {
    width: 200,
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.8,
  },
  route: {
    fontFamily: 'Verdana',
    fontSize: 15
  },
  date: {
    color: 'gray'
  }
  
});