import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import History from './user_history_page'
import ShipmentList from '../Map_components/shipment_list'

const HistoryNavigation = createAppContainer(createStackNavigator({
    History: {
      screen: History,
      navigationOptions: {
          header: null,
      },
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
    initialRouteName: 'History',
  }
))

export default HistoryNavigation;
 
