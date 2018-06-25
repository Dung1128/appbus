import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    InputGroup,
    Icon,
    Input,
    Text,
    Button,
    CheckBox,
    ListItem,
    Body,
} from 'native-base';
import { connect } from 'react-redux';
import { Shift, UserInfos, ErrorServer } from '../../commons/Constants';
import { Login } from '../../commons/Screen';
import { Logout } from '../../actions/Actions';
import StorageHelper from '../../utils/StorageHelper';
import fetchData from '../../utils/ConnectAPI';
import { CategoryEmployees, CategoryVehicle } from '../../commons/Screen';
import { NavigationActions, StackActions } from "react-navigation";

class ShiftEnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmEnd: '',
            arrHandover: [],
            arrCheckBoxValue: [],
        }
    }

    async componentWillMount() {
        try {
            let params = {
                token: this.props.userInfo.token,
                adm_id: this.props.userInfo.adm_id,
                dig_id: this.props.InfoTrips.content.dig_id,
            }

            let data = await fetchData('api_get_handover', params, 'POST');

            if (data && data.status_code == 200) {
                for (let i = 0; i < data.arrBanGiao.length; i++) {
                    let objCheckbox = {
                        bbg_bdg_id: '',
                        bbg_bdg_status: false,
                        bbg_ghi_chu: '',
                        bbg_ghi_chu_status: false,
                    }
                    objCheckbox.bbg_bdg_id = data.arrBanGiao[i].bdg_id;
                    this.state.arrCheckBoxValue[i] = objCheckbox;
                }

                this.setState({
                    arrHandover: data.arrBanGiao,
                });
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
        }
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
            >
                <InputGroup
                    style={styles.inputgroup_style}
                >
                    <Icon
                        name='md-star'
                    />
                    <Input
                        style={styles.input_style}
                        placeholder={Shift.End}
                        keyboardType='numeric'
                        onChangeText={(kmEnd) => this.setState({ kmEnd: kmEnd })}
                    />
                </InputGroup>
                <Text
                    style={styles.text_style}
                >
                    {Shift.Handover}
                </Text>
                <TouchableOpacity
                    style={styles.employ_touch_style}
                    onPress={this.selectVehicle.bind(this)}
                >
                    <Text
                        style={styles.employ_text_style}
                    >
                        {(!this.props.Vehicle ||
                            !this.props.Vehicle.bien_kiem_soat ||
                            (this.props.Vehicle.bien_kiem_soat == '')) ?
                            Shift.Vehicle : this.props.Vehicle.bien_kiem_soat}
                    </Text>
                </TouchableOpacity>
                <View
                    style={styles.view_checkbox_style}
                >
                    {this.renderHandover()}
                </View>
                <Button
                    block
                    style={styles.confirm_button_style}
                    onPress={this.handleEndTrip.bind(this)}
                >
                    <Text
                        style={styles.confirm_text_style}
                    >
                        {Shift.EndConfirm}
                    </Text>
                </Button>
            </ScrollView>
        );
    };

    selectVehicle() {
        this.props.navigation.navigate(CategoryVehicle);
    }

    renderHandover() {
        let html = [];

        for (let i = 0; i < this.state.arrHandover.length; i++) {
            let check = false;
            html.push(
                <View
                    key={i}
                >
                    <ListItem
                        key={i}
                        style={styles.listItem_style}
                    >
                        <CheckBox
                            checked={this.state.arrCheckBoxValue[i].bbg_bdg_status}
                            onPress={this.toggleCheckbox.bind(this, i)}
                        />
                        <Body>
                            <Text>
                                {this.state.arrHandover[i].bdg_name}
                            </Text>
                            <Button
                                transparent
                                small
                                onPress={this.toggleNote.bind(this, i)}
                                style={styles.button_plus_style}
                            >
                                <Icon
                                    name='ios-add'
                                />
                            </Button>
                        </Body>
                    </ListItem>
                    {this.state.arrCheckBoxValue[i].bbg_ghi_chu_status &&
                        <Input
                            placeholder={Shift.NoteStr}
                            value={this.state.arrCheckBoxValue[i].bbg_ghi_chu}
                            onChangeText={(text) => this.inputNote.bind(this, text, i)}
                            style={styles.input_note_style}
                        />
                    }
                </View>

            );
        }

        return html;
    }

    toggleCheckbox(index) {
        this.state.arrCheckBoxValue[index].bbg_bdg_status = !this.state.arrCheckBoxValue[index].bbg_bdg_status;
        this.setState({ arrCheckBoxValue: this.state.arrCheckBoxValue });
    }

    toggleNote(index) {
        this.state.arrCheckBoxValue[index].bbg_ghi_chu_status = !this.state.arrCheckBoxValue[index].bbg_ghi_chu_status;
        this.setState({ arrCheckBoxValue: this.state.arrCheckBoxValue });
    }

    inputNote(text, index) {
        this.state.arrCheckBoxValue[index].bbg_ghi_chu = text;
        this.setState({ arrCheckBoxValue: this.state.arrCheckBoxValue });
    }

    async handleEndTrip() {
        try {
            let params = {
                token: this.props.userInfo.token,
                adm_id: this.props.userInfo.adm_id,
                bbg_dig_id: this.props.InfoTrips.content.dig_id,
                // dig_id: this.props.InfoTrips.content.dig_id,
                bbg_xe_id: this.props.Vehicle.xe_id,
                dataBanGiao: this.state.arrCheckBoxValue,
            }
            console.log(params);

            let data = await fetchData('api_save_handover', params, 'POST');
            console.log(data);

            // if (data && data.status_code == 200) {
            //     StorageHelper.removeStore(UserInfos);
            //     this.props.dispatch(Logout());
            //     this.navigateToScreen(Login);
            // } else {
            //     if (data) {
            //         alert(data.message);
            //     }
            //     else {
            //         alert(ErrorServer);
            //     }
            // }
        } catch (error) {
            console.log(error);
        }
    }

    navigateToScreen = (route) => {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })],
        });

        this.props.navigation.dispatch(navigateAction);
    }
}

const mapStateToProp = state => {
    console.log(state);
    return {
        userInfo: state.AuthenticationReducer.userInfo,
        InfoTrips: state.TripsReducer.route,
        Vehicle: state.ManageCustomerReducer.vehicle,
    }
}

export default connect(mapStateToProp)(ShiftEnd);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    inputgroup_style: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        marginTop: 20,
        marginHorizontal: 30,
    },
    input_style: {
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    confirm_text_style: {
        color: 'black',
    },
    confirm_button_style: {
        marginTop: 20,
        marginHorizontal: 30,
        height: 60,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    text_style: {
        margin: 20,
    },
    view_checkbox_style: {
        borderWidth: 1,
    },
    employ_touch_style: {
        borderWidth: 1,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    employ_text_style: {
        textAlignVertical: 'center',
        margin: 10,
    },
    listItem_style: {
        flex: 1,
    },
    button_plus_style: {
        top: 0,
        right: 0,
        position: 'absolute',
    },
    input_note_style: {
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
    },
});