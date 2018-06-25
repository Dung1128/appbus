import React from 'react';
import {
    Icon,
} from 'native-base';
import {
    createMaterialTopTabNavigator
} from 'react-navigation';
import Outbound from './Outbound';
import Inbound from './Inbound';

const TabNavigator = createMaterialTopTabNavigator(
    {
        Outbound: {
            screen: Outbound,
            navigationOptions: {
                tabBarLabel: 'Chiều đi',
            }
        },
        Inbound: {
            screen: Inbound,
            navigationOptions: {
                tabBarLabel: 'Chiều về',
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon:
                ({ focused, tintColor }) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    if (routeName === 'Outbound') {
                        iconName = `ios-arrow-round-forward${focused ? '' : '-outline'}`;
                    } else if (routeName === 'Inbound') {
                        iconName = `ios-arrow-round-back${focused ? '' : '-outline'}`;
                    }

                    return <Icon name={iconName} size={25} color={tintColor} />;
                },
        }),
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            showIcon: true,
        },
    }
);

export default TabNavigator