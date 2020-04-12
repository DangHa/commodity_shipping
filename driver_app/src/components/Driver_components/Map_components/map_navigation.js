import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import Map from './map_page'
import ShipmentForm from './shipment_form'

const MapNavigation = createAppContainer(createStackNavigator({
    MapHome: {
      screen: Map,
      navigationOptions: {
          header: null,
      },
    }, 
    ShipmentDetail: {
      screen: ShipmentForm,
      navigationOptions: {
        title: "Shipment Detail",
      }
    }
  },
  {
    initialRouteName: 'MapHome',
  }
))

export default MapNavigation;
 
