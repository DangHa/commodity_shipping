import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Loading from './src/components/loadingScreen'
import DriveNavigator from './src/components/Driver_components/drive_navigation'
import AuthenticationNavigator from './src/components/Authentication/authentication_navigation'
console.disableYellowBox = true;

const AppNavigation = createAppContainer(createSwitchNavigator(
  {
    Loading: Loading,
    Authentic: AuthenticationNavigator,
    App: DriveNavigator
  },
  {
    initialRouteName: "Loading"
  }
))

export default class App extends Component {
  render() {
    return (
      <AppNavigation/>
    );
  }
};