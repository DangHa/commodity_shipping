import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Loading from './src/components/loadingScreen'
import UserNavigator from './src/components/User_components/user_navigation'
import AuthenticationNavigator from './src/components/Authentication/authentication_navigation'


const AppNavigation = createAppContainer(createSwitchNavigator(
  {
    Loading: Loading,
    Authentic: AuthenticationNavigator,
    App: UserNavigator
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