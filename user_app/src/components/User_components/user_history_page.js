import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Package extends Component{
  constructor(props) {
    super(props);

    this.state = {};
  }

  acceptPackage(item) {
    console.log("##################### accept")
    console.log(item.id)
    //send to the server
  }

  refusePackage(item) {
    console.log("##################### refuse")
    console.log(item.id)
    // Send to the server
  }

  render() {
    return(
      <View style={styles.childFlatView}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text style={styles.route}>{this.props.item.id}</Text>
            <Text style={styles.date}>{this.props.item.date}</Text>
          </View>

          { this.props.item.status ?
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
      showChildList: false
      
    };
  }

  componentDidMount() {
    console.log(this.props.item.numberWait)
  }

  render() {
    return(
      <View style={styles.flatview}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text style={styles.route}>{this.props.item.id}</Text>
            <Text style={styles.date}>{this.props.item.title}</Text>
          </View>

          {this.props.item.numberWait > 0 ?
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.setState({showChildList: !this.state.showChildList})}> 
                <Text style={styles.notifyButton}>{this.props.item.numberWait}</Text>
              </TouchableOpacity>
            </View>
          : 
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.setState({showChildList: !this.state.showChildList})}> 
                <Icon style={{color: 'grey'}} size={25} name={'chevron-right'}/>
              </TouchableOpacity>
            </View>
          }

        </View>
        
        { this.state.showChildList ?
          <FlatList
            data={this.props.item.packages}
            renderItem={({item})=>
            <Package item = {item}/>}
            keyExtractor={(item, index) => index.toString()}/>
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
    console.log("get data of user from serve");
    
    this.setState({
      shipments: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          numberWait: 2,  // the number status which are true
          packages: [
            {
              id: 'one',
              date: 'date',
              status: true //waiting for confirm'
            },
            {
              id: 'two',
              date: 'date',
              status: true //waiting for confirm'
            }
          ]
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          numberWait: 1,
          packages: [
            {
              id: 'three',
              date: 'date',
              status: true //waiting for confirm'
            },
            {
              id: 'four',
              date: 'date',
              status: false // accepted
            }
          ]
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          numberWait: 0,
        },
      ]
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Your Packages {"\n"}
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
  route: {
    fontFamily: 'Verdana',
    fontSize: 15
  },
  date: {
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