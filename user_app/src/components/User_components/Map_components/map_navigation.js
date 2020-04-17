import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import Map from './map_page'
import ShipmentList from './shipment_list'
import PackageDetail from './package_detail'

const MapNavigation = createAppContainer(createStackNavigator({
    MapHome: {
      screen: Map,
      navigationOptions: {
          header: null,
      },
    }, 
    PackageDetail:{
      screen: PackageDetail,
      navigationOptions: {
        title: "Package Detail",
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: 'white'
      }
    },
    ShipmentList: {
      screen: ShipmentList,
      navigationOptions: {
        title: "Shipment List",
        headerStyle: {backgroundColor: 'tomato'},
        headerTintColor: 'white'
      }
    }
  },
  {
    initialRouteName: 'MapHome',
  }
))

export default MapNavigation;
 
