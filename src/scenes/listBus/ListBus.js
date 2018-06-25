import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Icon,
} from 'native-base';
import { connect } from 'react-redux';
import fetchData from '../../utils/ConnectAPI';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ListBusConts, ErrorServer } from '../../commons/Constants';
import { locale } from '../../commons/Config'
import TabNavigator from './TabNavigator';

const today = new Date();

class ListBus extends Component {
    static navigationOptions = {
        headerLeft: null,
    }

    static router = TabNavigator.router;

    constructor(props) {
        super(props);

        this.state = {
            fullDate: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
            isDateTimePickerVisible: false,
            loading: true,
            arrOutbound: [],
            arrInbound: [],
        }
    }

    async componentWillMount() {
        try {
            this.getRoute();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <View
                    style={styles.view_search}
                >
                    <Text
                        style={styles.text_datepicker}
                        onPress={this._showDateTimePicker}
                    >
                        {this.state.fullDate}
                    </Text>
                </View>

                <TabNavigator
                    navigation={this.props.navigation}
                    screenProps={{
                        loading: this.state.loading,
                        arrInbound: this.state.arrInbound,
                        arrOutbound: this.state.arrOutbound,
                    }}
                />

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    cancelTextIOS={ListBusConts.DatePickerCancel}
                    confirmTextIOS={ListBusConts.DatePickerConfirm}
                    titleIOS={ListBusConts.DatePickerTitle}
                    locale={locale}
                />
            </View>
        );
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = async (date) => {
        try {
            this.setState({
                loading: true,
                fullDate: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
            });

            this._hideDateTimePicker();

            this.getRoute();
        } catch (error) {
            console.log(error);
        }
    };

    async getRoute() {
        let userInfo = this.props.userInfo,
            arrOutbound = [],
            arrInbound = [];

        let params = {
            token: userInfo.token,
            adm_id: userInfo.adm_id,
        }

        let data = await fetchData('api_get_route', params, 'POST');

        if (data && data.status_code == 200) {
            for (let i = 0; i < data.arrTuyen.length; i++) {
                arrOutbound[i] = Object.assign({}, data.arrTuyen[i]);
                arrInbound[i] = Object.assign({}, data.arrTuyen[i]);

                let paramsNote = {
                    token: userInfo.token,
                    adm_id: userInfo.adm_id,
                    tuy_id: data.arrTuyen[i].tuy_id,
                    day: this.state.fullDate,
                }

                let dataNodes = await fetchData('api_get_node', paramsNote, 'POST');

                if (dataNodes && dataNodes.status_code == 200) {
                    arrOutbound[i].arrNodes = [];
                    arrInbound[i].arrNodes = [];

                    for (let j = 0; j < dataNodes.arrBusNot.length; j++) {
                        arrOutbound[i].arrNodes[j] = Object.assign({}, dataNodes.arrBusNot[j]);
                        arrInbound[i].arrNodes[j] = Object.assign({}, dataNodes.arrBusNot[j]);

                        let arrOutboundBus = [],
                            arrInboundBus = [];

                        for (let k = 0; k < dataNodes.arrBusNot[j].arrBusNotGio.length; k++) {
                            if (dataNodes.arrBusNot[j].arrBusNotGio[k].chieu_di == 1) {
                                arrOutboundBus.push(dataNodes.arrBusNot[j].arrBusNotGio[k]);
                            }

                            if (dataNodes.arrBusNot[j].arrBusNotGio[k].chieu_di == 2) {
                                arrInboundBus.push(dataNodes.arrBusNot[j].arrBusNotGio[k]);
                            }
                        }

                        arrOutbound[i].arrNodes[j].arrBusNotGio = arrOutboundBus;
                        arrInbound[i].arrNodes[j].arrBusNotGio = arrInboundBus;
                    }
                } else {
                    if (dataNodes) {
                        alert(dataNodes.message);
                    }
                    else {
                        alert(ErrorServer);
                    }
                }
            }

            this.setState({
                arrOutbound: arrOutbound,
                arrInbound: arrInbound,
                loading: false,
            });
        } else {
            if (data) {
                alert(data.message);
            }
            else {
                alert(ErrorServer);
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.AuthenticationReducer.userInfo,
    }
}

export default connect(mapStateToProps)(ListBus);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        alignItems: 'center',
        top: 80,
        paddingRight: 20,
        paddingLeft: 20,
    },
    button_search: {
        flex: 1,
        borderRadius: 0,
        height: 40,
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon_search: {
        color: '#fff',
    },
    text_datepicker: {
        flex: 3,
        paddingLeft: 10,
        textAlignVertical: 'center',
    },
    view_search: {
        flexDirection: 'row',
        margin: 10,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
    },
});