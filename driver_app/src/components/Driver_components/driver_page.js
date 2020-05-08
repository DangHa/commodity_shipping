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

  async componentDidMount() {
    let phone = await AsyncStorage.getItem('userPhone');

    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        phone: phone
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/driver/getInfoDriver', data)
            .then((response) => response.json())
            .then((json) => {
                return json[0]
            })
            .catch((error) => {
                console.error(error);
            });
    
    this.setState({
      wantToChange: false,
      phone       : result.phone,
      username    : result.username,
      address     : result.address
    })
  }

  async signout() {
    this.props.navigation.navigate("Loading");
    await AsyncStorage.setItem('loginCheck', "false");
    await AsyncStorage.setItem('userPhone', "");
  }

  async sendNewInformation() {
    let oldPhone = await AsyncStorage.getItem('userPhone');

    // Send In here
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        oldPhone: oldPhone,
        phone: this.state.phone,
        username: this.state.username,
        address: this.state.address
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    var result = await fetch('http://172.18.0.1:8080/driver/updateInforDriver', data)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => {
                console.error(error);
            });

    if (result === "New phone number has already been registed for another account"){
      alert(result)
    } else if (result === true) {
      alert("Your information has been updated")
      await AsyncStorage.setItem('userPhone', this.state.phone);
      this.componentDidMount()
      this.setState({wantToChange: true})
    } else {
      alert("There are something wrong")
      this.setState({wantToChange: true})
    }
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