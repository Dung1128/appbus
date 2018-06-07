import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { DrawerActions, NavigationActions, StackActions } from "react-navigation";
import * as Screens from '../../commons/Screen'

class DrawerMenu extends Component {
    navigateToScreen = (route) => () => {
        // const navigateAction = NavigationActions.navigate({
        //     routeName: route,
        // });

        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })],
          });

        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={this.navigateToScreen(Screens.Login)}
                >
                    <Text style={styles.menuItemText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
    },
    menuItem: {
        padding: 10,
        justifyContent: "center",
        backgroundColor: "rgba(12, 12, 12, 0.2)",
        marginBottom: 2
    },
    menuItemText: {
        fontSize: 20
    },
});

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;