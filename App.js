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
import ShiftStart from './src/scenes/shift/ShiftStart';
import GroupNodes from './src/scenes/nodes/GrNodes';
import DrawerMenu from './src/scenes/menu/Menu';
import ListBus from './src/scenes/listBus/ListBus';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const store = createStore(RootReducers);

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
    marginTop: -20,
  },
  icon_menu: {
    marginRight: 10,
    marginTop: -10,
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
    ShiftStart: {
      screen: ShiftStart
    },
    GroupNodes: {
      screen: GroupNodes
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: ({ navigation }) => ({
      headerTitle:
        <Image square style={styles.image_header}
          source={require('./assets/logo.png')}
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
          <Icon name='ios-menu' />
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

