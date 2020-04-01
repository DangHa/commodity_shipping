import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

export default class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        <TextInput />
        <TextInput />
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
});