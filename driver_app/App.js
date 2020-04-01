import React, { Component } from 'react';

import DriveNavigator from './src/components/Driver_components/drive_home'
import AuthenticationNavigator from './src/components/Authentication/authentication_home'

export default class App extends Component {
  render() {
    return (
      <AuthenticationNavigator/>
    );
  }
};