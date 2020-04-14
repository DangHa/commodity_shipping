import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Driver extends Component {
  constructor(props) {
      super(props);

      this.state ={
        wantToChange: false,
        phone       : "00000000",
        username    : "dang ha",
        address     : "Thai Binh city"
      };

      this.sendNewInformation.bind(this)
      this.signout.bind(this)
  }

  componentDidMount() {
    console.log("get data of user from serve");
    this.setState({
      wantToChange: false
    })
  }

  signout = async()=>{
    this.props.navigation.navigate("Loading");
    await AsyncStorage.setItem('loginCheck', "false");
  }

  sendNewInformation() {
    console.log("Send new user information");
    this.setState({wantToChange: false})
    console.log(this.state.wantToChange);
    // wait send back 
  }

  render() {
    return (
      
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}> 
          <Text style={[{fontSize: 32, color: '#1565c0'}, {fontWeight: "bold"}]}>Your Information{"\n"}</Text>
        </View>
        
        <View>
          {this.state.wantToChange ?
            <View style={styles.inputBox}>
              <Icon style={styles.imageStyle} size={25} name={'phone'} />
              <TextInput style={{ flex: 1 }}
                  onChangeText={(phone) => this.setState({phone: phone})}
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="Phone"
                  placeholderTextColor = "#002f6c"
                  selectionColor="#fff"
                  keyboardType="numeric"
                  value={this.state.phone}/>
            </View>
          : <Text>
              <Icon style={styles.imageStyle} size={25} name={'phone'} />
              <Text style={{fontSize: 15}}>    {this.state.phone}</Text>
            </Text>
          }
          <Text></Text>
        </View>

        <View>
          
          {this.state.wantToChange ?
          <View style={styles.inputBox}>
            <Icon style={styles.imageStyle} size={25} name={'user'} />
            <TextInput style={{ flex: 1 }}
                onChangeText={(username) => this.setState({username: username})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Username"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="default"
                value={this.state.username}/>
          </View>
          : <Text>
              <Icon style={styles.imageStyle} size={25} name={'user'} />
              <Text style={{fontSize: 15}}>    {this.state.username}</Text>
            </Text>
          }
          <Text></Text>
        </View>

        <View>
          {this.state.wantToChange ?
          <View style={styles.inputBox}>
            <Icon style={styles.imageStyle} size={25} name={'home'} />
            <TextInput style={{ flex: 1 }}
                onChangeText={(address) => this.setState({address: address})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="address"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="default"
                value={this.state.address}/>
          </View>
          : <Text>
              <Icon style={styles.imageStyle} size={25} name={'home'} />
              <Text style={{fontSize: 15}}>    {this.state.address}</Text>
            </Text>
          }
        </View>
        
        <View style={styles.bottom}>
          {this.state.wantToChange ?
            <View style={{ flexDirection:"row" }}>
              <TouchableOpacity style={styles.buttonConfirm}> 
                <Text style={styles.buttonText} onPress={this.sendNewInformation.bind(this)}>
                  Update new information
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonConfirm, {backgroundColor: "red", width: 100}]}> 
                <Text style={styles.buttonText} onPress={this.componentDidMount.bind(this)}>
                  Cancle
                </Text>
              </TouchableOpacity>
            </View>
          : <TouchableOpacity style={styles.button}> 
              <Text style={styles.buttonText} onPress={() => this.setState({wantToChange: true})}>
                Change your information
              </Text>
            </TouchableOpacity>
          }
          
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.signout.bind(this)}>Sign out</Text>
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
  button: {
    width: 250,
    backgroundColor: '#1565c0',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  buttonConfirm: {
    width: 200,
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: 10,
    marginRight: 10,
    paddingVertical: 12
  },
  inputBox: {
    width: 370,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    color: '#002f6c',
    marginLeft: 5,
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 16,
  }
});