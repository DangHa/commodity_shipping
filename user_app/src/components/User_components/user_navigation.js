import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import User from './user_page'
import MapNavigation from './Map_components/map_navigation'
import HistoryNavigation from './User_history_component/history_navigation'

const UserNavigator = createMaterialBottomTabNavigator(
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
      screen: HistoryNavigation,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'layers'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: 'tomato' },
      }
    },
    Profile: {
      screen: User,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={20} name={'user'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: 'tomato' },
      }
    },
  },
  {
    initialRouteName: 'Map',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: 'tomato' },
  }
);

export default createAppContainer(UserNavigator);