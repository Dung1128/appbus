import React from 'react';
import {
    createBottomTabNavigator
} from 'react-navigation';
import { TabManageStr } from '../../commons/Constants';
import ManageCustomer from './ManageCustomer';
import ShiftStart from './ShiftStart';
import ShiftEnd from './ShiftEnd';

const TabManage = createBottomTabNavigator(
    {
        StartShifts: {
            screen: ShiftStart,
            navigationOptions: {
                tabBarLabel: TabManageStr.ShiftStart,
            }
        },
        ManageCustomer: {
            screen: ManageCustomer,
            navigationOptions: {
                tabBarLabel: TabManageStr.ManageShift,
            }
        },
        EndShifts: {
            screen: ShiftEnd,
            navigationOptions: {
                tabBarLabel: TabManageStr.ShiftEnd,
            }
        }
    },
    {
        initialRouteName: 'ManageCustomer',
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            allowFontScaling: true,
            labelStyle: {
                fontSize: 18,
                marginBottom: 15,
            },
        },
    }
);

export default TabManage