import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Driver extends Component {
  constructor(props) {
      super(props);

      this.state ={
        wantToChange: false,
        buttonName  : "Change your infor",
        phone       : "00000000",
        username    : "dang ha",
        address     : "Thai Binh city"
      };

      this.sendNewInformation.bind(this)
      this.signout.bind(this)
  }

  signout = async()=>{
    this.props.navigation.navigate("Loading");
    await AsyncStorage.setItem('loginCheck', "false");
  }

  changeInformation() {
    this.setState({wantToChange: true})
    console.log(this.state.wantToChange);
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
          <Text style={[{fontSize: 20}, {fontWeight: "bold"}]}>Your Information{"\n"}{"\n"}</Text>
        </View>
        
        <Text>
          <Icon style={styles.imageStyle} size={25} name={'phone'} />
          {this.state.wantToChange ?
            <TextInput style={styles.inputBox}
              onChangeText={(phone) => this.setState({phone})}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Phone"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              keyboardType="numeric"/>
          : <Text style={{fontSize: 15}}>    {this.state.phone}</Text>}
          <Text>{"\n"}{"\n"}</Text>
        </Text>

        <Text>
          <Icon style={styles.imageStyle} size={25} name={'user'} />
          {this.state.wantToChange ?
            <TextInput style={styles.inputBox}
              onChangeText={(phone) => this.setState({phone})}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Phone"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              keyboardType="numeric"/>
          : <Text style={{fontSize: 15}}>    {this.state.username}</Text>}
          <Text>{"\n"}{"\n"}</Text>
        </Text>

        <Text>
          <Icon style={styles.imageStyle} size={25} name={'home'} />
          {this.state.wantToChange ?
            <TextInput style={styles.inputBox}
              onChangeText={(phone) => this.setState({phone})}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Phone"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              keyboardType="numeric"/>
          : <Text style={{fontSize: 15}}>    {this.state.address}</Text>}
        </Text>
        

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}>
          {this.state.wantToChange ?
            <Text style={styles.buttonText} onPress={this.sendNewInformation.bind(this)}>
              Update new information
            </Text>
          : <Text style={styles.buttonText} onPress={this.changeInformation.bind(this)}>
              Change your information
            </Text>
          }
            
          </TouchableOpacity>
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
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  inputBox: {
    width: 350,
    backgroundColor: '#eeeeee', 
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10
  }
});