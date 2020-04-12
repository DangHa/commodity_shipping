import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Driver from './driver_page'
import MapNavigation from './Map_components/map_navigation'
import History from './drive_history_page'

const DriveNavigator = createMaterialBottomTabNavigator(
  {
    Map: {
      screen: MapNavigation,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'map'} />
          </View>
        ),
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'layers'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#1565c0' },
      }
    },
    Profile: {
      screen: Driver,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'user'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: '#1565c0' },
      }
    },
  },
  {
    initialRouteName: 'Map',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#1565c0' },
  }
);

export default createAppContainer(DriveNavigator);