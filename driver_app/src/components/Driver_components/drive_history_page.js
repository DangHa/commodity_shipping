import React, { Component } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Shipment History</Text>
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