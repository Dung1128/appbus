import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
} from 'native-base';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducers from './src/reducers/Reducers';
import { YellowBox } from 'react-native';
import { ColorHeader } from './src/commons/Constants';
import Login from './src/scenes/login/Login';
import ManageCustomer from './src/scenes/manage/ManageCustomer';
import DrawerMenu from './src/scenes/menu/Menu';
import ListBus from './src/scenes/listBus/ListBus';
import ListBusStop from './src/scenes/manage/ListBusStop';
import TabManage from './src/scenes/manage/TabManage';
import CategoryTicket from './src/scenes/manage/CategoryTicket';
import CategoryVehicle from './src/scenes/manage/CategoryVehicle';
import CategoryEmployees from './src/scenes/manage/CategoryEmployees';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const store = createStore(RootReducers);
const logo = require('./assets/logo.png');

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  image_header: {
    resizeMode: 'contain',
    height: 60,
    marginTop: -20,
  },
  icon_menu: {
    marginRight: 10,
    marginTop: -10,
  },
  icon_header: {
    color: 'white',
  },
});

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    ListBus: {
      screen: ListBus,
    },
    ListBusStop: {
      screen: ListBusStop
    },
    TabManage: {
      screen: TabManage
    },
    CategoryTicket: {
      screen: CategoryTicket
    },
    CategoryVehicle: {
      screen: CategoryVehicle,
    },
    CategoryEmployees: {
      screen: CategoryEmployees,
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: ({ navigation }) => ({
      headerTitle:
        <Image
          square
          style={styles.image_header}
          source={logo}
        />,
      headerStyle: {
        backgroundColor: ColorHeader,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight:
        <TouchableOpacity
          style={styles.icon_menu}
          onPress={() => navigation.openDrawer()}
        >
          <Icon
            name='ios-menu'
            style={styles.icon_header}
          />
        </TouchableOpacity>
    }),
  }
);

const MyApp = createDrawerNavigator(
  {
    RootStack: {
      screen: RootStack
    },
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: 300,
  }
);

