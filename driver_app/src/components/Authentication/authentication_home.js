import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import SignIn from './signin'
import SignUp from './signup'

const AuthenticationNavigator = createMaterialBottomTabNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'login'} />
          </View>
        ),
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'user-follow'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#E94B3CFF' },
      }
    },
  },
  {
    initialRouteName: 'SignIn',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#E94B3CFF' },
  }
);

export default createAppContainer(AuthenticationNavigator);