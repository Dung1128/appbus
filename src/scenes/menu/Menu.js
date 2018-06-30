import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
} from "react-native";
import {
    Header,
} from 'native-base';
import { connect } from 'react-redux';
import fetchData from '../../utils/ConnectAPI';
import StorageHelper from '../../utils/StorageHelper';
import { DrawerActions, NavigationActions, StackActions } from "react-navigation";
import * as Screens from '../../commons/Screen';
import { MenuSreen, UserInfos, ErrorServer, ColorHeader } from '../../commons/Constants';
import { Logout } from '../../actions/Actions';

const logo = require('../../../assets/logo.png');

class DrawerMenu extends Component {
    navigateToScreen = (route) => {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })],
        });

        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    constructor(props) {
        super(props);
        this.signgout = this.signgout.bind(this);
        this.state = {
            arrMenu: [],
        };
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <Header style={{ backgroundColor: ColorHeader }}>
                    <Image
                        square
                        style={{ resizeMode: 'contain', height: 50, marginTop: -15 }}
                        source={logo}
                    />
                </Header>
                <TouchableOpacity
                    style={styles.menuItem}
                // onPress={this.logout}
                >
                    <Text
                        style={styles.menuItemText}
                    >
                        {MenuSreen.Report}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                // onPress={this.logout}
                >
                    <Text
                        style={styles.menuItemText}
                    >
                        {MenuSreen.UpdateFuel}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                // onPress={this.logout}
                >
                    <Text
                        style={styles.menuItemText}
                    >
                        {MenuSreen.UpdateExcept}
                    </Text>
                </TouchableOpacity>

                {this.renderMenu()}
                <View
                    style={styles.version_style}
                >
                    <Text
                        style={[styles.text, { color: '#ccc' }]
                        }>
                        {'Version: 1.0'}
                    </Text>
                </View>
            </View>
        );
    }

    renderMenu() {
        let html = [];

        if (this.props.arrMenu) {
            html.push(
                <ScrollView
                    style={{ flex: 1 }}
                    key='menu'
                >
                    {this.props.arrMenu[0].status &&
                        <TouchableOpacity
                            style={styles.menuItem}
                        // onPress={this.logout}
                        >
                            <Text
                                style={styles.menuItemText}
                            >
                                {this.props.arrMenu[0].title}
                            </Text>
                        </TouchableOpacity>
                    }
                    {this.props.arrMenu[1].status &&
                        <TouchableOpacity
                            style={styles.menuItem}
                        // onPress={this.logout}
                        >
                            <Text
                                style={styles.menuItemText}
                            >
                                {this.props.arrMenu[1].title}
                            </Text>
                        </TouchableOpacity>
                    }
                    {this.props.arrMenu[2].status &&
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={this.signgout}
                        >
                            <Text
                                style={styles.menuItemText}
                            >
                                {this.props.arrMenu[2].title}
                            </Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
            );

        }

        return html;
    }

    async signgout() {
        try {
            let params = {
                adm_id: this.props.userInfo.adm_id,
            }

            let data = await fetchData('api_logout', params, 'POST');

            if (data && data.status_code == 200) {
                StorageHelper.removeStore(UserInfos);
                this.props.dispatch(Logout());
                this.navigateToScreen(Screens.Login);
            } else {
                if (data) {
                    alert(data.message);
                }
                else {
                    alert(ErrorServer);
                }
            }
        } catch (error) {
            console.log(error);
            alert(ErrorServer);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuItem: {
        padding: 10,
        justifyContent: "center",
        backgroundColor: "rgba(12, 12, 12, 0.2)",
        marginBottom: 2,
    },
    menuItemText: {
        fontSize: 20
    },
    version_style: {
        alignItems: 'center',
        marginBottom: 10,
    },
});

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

const mapStateToProps = state => {
    return {
        userInfo: state.AuthenticationReducer.userInfo,
        arrMenu: state.AuthenticationReducer.menu,
    }
}

export default connect(mapStateToProps)(DrawerMenu);