import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Input,
    Text,
    Button,
} from 'native-base';
import { connect } from 'react-redux';
import InfoTrips from './InfoTrips';
import { ListBusStop, CategoryTicket, ListBus } from '../../commons/Screen';
import fetchData from '../../utils/ConnectAPI';
import { ManageCus, ErrorServer } from '../../commons/Constants';
import { InputBusStop, ClearCache } from '../../actions/Actions';

class ManageCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serial: '',
            customerIn: '',
            customerInTicketDaily: '',
            customerOut: '',
        }
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
            >
                <InfoTrips />
                <View
                    style={styles.view_container_style}
                >
                    <TouchableOpacity
                        style={styles.location_style}
                        onPress={this.selectLocaiton.bind(this)}
                    >
                        <Text
                            style={styles.location_text_style}
                        >
                            {(!this.props.busStopInfo || !this.props.busStopInfo.ddt_name || (this.props.busStopInfo.ddt_name.trim() == '')) ?
                                ManageCus.selectLocationStr : this.props.busStopInfo.ddt_name}
                        </Text>
                    </TouchableOpacity>
                    {this.props.busStopInfo && this.props.busStopInfo.ddt_diem_chot == 1 &&
                        <View
                            style={styles.view_cus_style}
                        >
                            <TouchableOpacity
                                style={styles.touch_cus_style}
                                onPress={this.selectCategoryTicket.bind(this)}
                            >
                                <Text
                                    style={styles.text_cus_style}
                                >
                                    {(!this.props.categoryTicket || !this.props.categoryTicket.bvd_ma_ve || (this.props.categoryTicket.bvd_ma_ve == '')) ?
                                        ManageCus.selectCategoryTicketStr : this.props.categoryTicket.bvd_ma_ve}
                                </Text>
                            </TouchableOpacity>
                            <Input
                                placeholder={ManageCus.InputSerialStr}
                                value={this.state.serial}
                                onChangeText={(text) => this.setState({ serial: text })}
                                style={styles.input_style}
                            />
                        </View>
                    }

                    <View
                        style={styles.view_check_style}
                    >
                        <Input
                            placeholder={ManageCus.TotalCusInStr}
                            value={this.state.customerIn}
                            onChangeText={(text) => this.setState({ customerIn: text })}
                            style={styles.input_style}
                        />
                        <Input
                            placeholder={ManageCus.CusInTicketDailyStr}
                            value={this.state.customerInTicketDaily}
                            onChangeText={(text) => this.setState({ customerInTicketDaily: text })}
                            style={styles.input_style}
                        />
                        <Input
                            placeholder={ManageCus.TotalCusOutStr}
                            value={this.state.customerOut}
                            onChangeText={(text) => this.setState({ customerOut: text })}
                            style={styles.input_style}
                        />
                        <Button
                            block
                            style={styles.confirm_button_style}
                            onPress={this.updateCustomer.bind(this)}
                        >
                            <Text
                                style={styles.confirm_text_style}
                            >
                                {ManageCus.ButtonUpdateStr}
                            </Text>
                        </Button>
                    </View>
                    <Button
                        block
                        style={styles.confirm_button_style}
                        onPress={this.finishTrip.bind(this)}
                    >
                        <Text
                            style={styles.confirm_text_style}
                        >
                            {ManageCus.ButtonFinishStr}
                        </Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }

    selectLocaiton() {
        this.props.navigation.navigate(ListBusStop);
    }

    selectCategoryTicket() {
        this.props.navigation.navigate(CategoryTicket);
    }

    async updateCustomer() {
        try {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    this.saveCustomer(position.coords.latitude, position.coords.longitude);
                },
                async (error) => {
                    this.saveCustomer('', '');
                },
                {
                    enableHighAccuracy: false,
                    timeout: 20000,
                    maximumAge: 1000,
                },
            );

        } catch (error) {
            console.log(error);
        }
    }

    async saveCustomer(lat, long) {
        let today = new Date();
        let params = {
            token: this.props.userInfo.token,
            adm_id: this.props.userInfo.adm_id,
            bvv_ddt_id: this.props.busStopInfo.ddt_tuy_id,
            bvv_time: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
            bvv_dig_id: this.props.InfoTrips.content.dig_id,
            bvv_seri: this.state.serial,
            bvv_danh_muc: this.props.categoryTicket.bvd_id,
            bvv_tong_khach_len: this.state.customerIn,
            bvv_khach_len: this.state.customerInTicketDaily,
            bvv_khach_xuong: this.state.customerOut,
            bvv_lat: lat,
            bvv_long: long,
        }

        let data = await fetchData('api_save_customer', params, 'POST');

        if (data && data.status_code == 200) {
            this.state.serial = '';
            this.state.customerIn = '';
            this.state.customerInTicketDaily = '';
            this.state.customerOut = '';
            this.props.dispatch(ClearCache());
            alert(ManageCus.MessSuccess);
        } else {
            if (data) {
                alert(data.message);
            }
            else {
                alert(ErrorServer);
            }
        }
    }

    finishTrip() {
        this.props.navigation.navigate(ListBus);
        this.props.dispatch(ClearCache());
    }
}

const mapStateToProp = state => {
    return {
        busStopInfo: state.ManageCustomerReducer.busStop,
        categoryTicket: state.ManageCustomerReducer.categoryTicket,
        userInfo: state.AuthenticationReducer.userInfo,
        InfoTrips: state.TripsReducer.route,
    }
}

export default connect(mapStateToProp)(ManageCustomer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    confirm_text_style: {
        color: 'black',
    },
    confirm_button_style: {
        marginTop: 20,
        marginHorizontal: 30,
        height: 60,
        // backgroundColor: ColorHeader,
    },
    input_style: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
    },
    view_container_style: {
        flex: 1,
        margin: 5,
    },
    location_style: {
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
    },
    location_text_style: {
        textAlignVertical: 'center',
        margin: 10,
    },
    view_cus_style: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    touch_cus_style: {
        borderWidth: 1,
        borderRadius: 10,
    },
    text_cus_style: {
        textAlignVertical: 'center',
        margin: 10,
    },
    view_check_style: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
});
