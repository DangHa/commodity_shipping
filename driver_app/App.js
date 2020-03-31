import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Driver from './src/driver_page'
import Map from './src/map_page'
import History from './src/drive_history'

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Map: {
      screen: Map,
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
        barStyle: { backgroundColor: '#2163f6' },
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
        barStyle: { backgroundColor: '#2c6d6a' },
      }
    },
  },
  {
    initialRouteName: 'Map',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#6948f4' },
  }
);

export default createAppContainer(TabNavigator);