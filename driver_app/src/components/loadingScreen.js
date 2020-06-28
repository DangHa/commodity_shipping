import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator, AsyncStorage} from 'react-native';

export default class Loading extends Component {
    componentDidMount = async()=> {
        //If the user have signed in turn to home page
        let loginCheck = await AsyncStorage.getItem('loginCheck');
        let phone = await AsyncStorage.getItem('userPhone');
        
        if (loginCheck === "true" && phone !== null) {
          this.props.navigation.navigate("App");
        }else {
          this.props.navigation.navigate("Authentic");
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to my app</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
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
    fontSize: 25,
    marginBottom: 25
  }
});