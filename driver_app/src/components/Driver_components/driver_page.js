import React, { Component } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default class Driver extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>First Navigation of Ha</Text>
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
  }
});