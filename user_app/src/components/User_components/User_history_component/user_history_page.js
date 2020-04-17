import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Package extends Component{
  constructor(props) {
    super(props);

    this.state ={
      showChildList: false
    };
  }

  componentDidMount() {
    console.log(this.props.item.numberWait)
  }

  requestShipmentForPackage(item){
    console.log("SEND TO SERVER FOR CONNECT")
    console.log(item)
    this.props.navigation.navigate("ShipmentList")
  }

  render() {
    return(
      <View style={styles.flatview}>
        <View style={{ flexDirection:"row"}}>
          <View style={{ flex: 1, paddingLeft: 5}}>
            <Text style={styles.route}>{this.props.item.id}</Text>
            <Text style={styles.date}>{this.props.item.title}</Text>
          </View>

          {this.props.item.status === 'refused' ?
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.setState({showChildList: !this.state.showChildList})}> 
                <Icon style={{color: '#1565c0'}} size={25} name={'error'}/>
              </TouchableOpacity>
            </View>
          : 
            <View style={{ flex: 0}}>
              <TouchableOpacity onPress={() => this.setState({showChildList: !this.state.showChildList})}> 
                <Icon style={{color: 'grey'}} size={25} name={'expand-more'}/>
              </TouchableOpacity>
            </View>
          }

        </View>
        
        { this.state.showChildList ?
          <View>
            <View style={{ flexDirection:"row"}}>
              <View style={{ flex: 1, paddingLeft: 15}}>
                <Text style={styles.date}>{"\n"}Price: </Text>
                <Text style={styles.date}>Starting date:</Text>
                <Text style={styles.date}>Status: {this.props.item.status}</Text>
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
          status : 'accepted',  // the number status which are true
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          status : 'refused',   // the number status which are true
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          status : 'waiting',
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
  route: {
    fontFamily: 'Verdana',
    fontSize: 15
  },
  date: {
    color: 'gray'
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