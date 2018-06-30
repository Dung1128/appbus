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
    Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { Shift, ErrorServer, LoadingStr } from '../../commons/Constants';
import { ManageCustomer } from '../../commons/Screen';
import { InputShiftStart } from '../../actions/Actions';
import fetchData from '../../utils/ConnectAPI';
import { CategoryVehicle } from '../../commons/Screen';

class ShiftStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmStart: '',
            arrHandover: [],
            arrCheckBoxValue: [],
            loading: true,
        }
    }

    async componentWillMount() {
        try {
            let params = {
                token: this.props.userInfo.token,
                adm_id: this.props.userInfo.adm_id,
                dig_id: this.props.InfoTrips.content.dig_id,
            }

            let data = await fetchData('api_get_receive_handover', params, 'POST');
            console.log(data);

            if (data && data.status_code == 200) {
                for (let i = 0; i < data.arrNhanBanGiao.length; i++) {
                    let objCheckbox = {
                        bbg_bdg_id: '',
                        bbg_bdg_status: false,
                        bbg_ghi_chu: '',
                        bbg_ghi_chu_status: false,
                    }

                    objCheckbox.bbg_bdg_id = data.arrNhanBanGiao[i].bdg_id;
                    this.state.arrCheckBoxValue[i] = objCheckbox;
                }

                this.setState({
                    arrHandover: data.arrNhanBanGiao,
                    loading: false,
                });
            } else {
                if (data) {
                    alert(data.message);
                    this.setState({
                        loading: false,
                    });
                }
                else {
                    alert(ErrorServer);
                    this.setState({
                        loading: false,
                    });
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
                        placeholder={Shift.Start}
                        keyboardType='numeric'
                        onChangeText={(kmStart) => this.setState({ kmStart: kmStart })}
                    />
                </InputGroup>
                <Text
                    style={styles.text_style}
                >
                    {Shift.Handover}
                </Text>
                <TouchableOpacity
                    disabled={true}
                    style={styles.employ_touch_style}
                // onPress={this.selectVehicle.bind(this)}
                >
                    <Text
                        style={styles.employ_text_style}
                    >
                        {this.props.InfoTrips.content.xe_text}
                    </Text>
                </TouchableOpacity>
                <View
                    style={styles.view_checkbox_style}
                >
                    {this.state.loading &&
                        <View
                            style={styles.load_style}
                        >
                            <Spinner />
                            <Text>
                                {LoadingStr}
                            </Text>
                        </View>
                    }
                    {!this.state.loading &&
                        this.renderHandover()
                    }
                </View>
                <Button
                    block
                    style={styles.confirm_button_style}
                    onPress={this.handleInputKMStart.bind(this)}
                >
                    <Text
                        style={styles.confirm_text_style}
                    >
                        {Shift.StartConfirm}
                    </Text>
                </Button>
            </ScrollView>
        );
    };

    selectVehicle() {
        this.props.navigation.navigate(CategoryVehicle);
    }

    renderHandover() {
        let html = [],
            iconName = '',
            colorIcon = 'white';

        for (let i = 0; i < this.state.arrHandover.length; i++) {
            if (this.state.arrHandover[i].status == 'true') {
                iconName = 'ios-checkmark';
                colorIcon = 'green';

            } else {
                iconName = 'ios-close';
                colorIcon = 'red';
            }

            let check = false;
            html.push(
                <View
                    key={i}
                >
                    <ListItem
                        style={styles.listItem_style}
                    >
                        <CheckBox
                            checked={this.state.arrCheckBoxValue[i].bbg_bdg_status}
                            onPress={this.toggleCheckbox.bind(this, i)}
                        />
                        <Body>
                            <Text>
                                {this.state.arrHandover[i].bdg_name}
                                {this.state.arrHandover[i].ghi_chu.trim() != '' &&
                                    <Text
                                        style={styles.child_text_style}
                                    >
                                        {'\n'}
                                        {this.state.arrHandover[i].ghi_chu}
                                    </Text>
                                }
                            </Text>
                            <Icon
                                name={iconName}
                                style={[styles.icon_check_style, { color: colorIcon }]}
                            />
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
                            onChangeText={(text) => this.inputNote(text, i)}
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

    async handleInputKMStart() {
        try {
            let params = {
                token: this.props.userInfo.token,
                adm_id: this.props.userInfo.adm_id,
                bbg_dig_id: this.props.InfoTrips.content.dig_id,
                bbg_xe_id: this.props.InfoTrips.content.xe_id,
                dataBanGiao: this.state.arrCheckBoxValue,
                km_dau_ca: this.state.kmStart,
            }

            let data = await fetchData('api_save_receive_handover', params, 'POST');

            if (data && data.status_code == 200) {
                this.props.navigation.navigate(ManageCustomer);
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
}

const mapStateToProp = state => {
    return {
        userInfo: state.AuthenticationReducer.userInfo,
        InfoTrips: state.TripsReducer.route,
        Vehicle: state.ManageCustomerReducer.vehicle,
    }
}

export default connect(mapStateToProp)(ShiftStart);

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
        marginVertical: 20,
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
    icon_check_style: {
        top: 0,
        right: 50,
        position: 'absolute',
    },
    child_text_style: {
        color: 'red',
        fontSize: 12,
    },
    load_style: {
        alignItems: 'center',
    },
});