import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, AsyncStorage} from 'react-native';

export default class Driver extends Component {
  constructor(props) {
      super(props);
      this.signout.bind(this)
  }

  signout = async()=>{
    this.props.navigation.navigate("Loading");
    await AsyncStorage.setItem('loginCheck', "false");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>First Navigation of Ha</Text>

        <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText} onPress={this.signout}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  button: {
      width: 300,
      backgroundColor: '#4f83cc',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  }
});