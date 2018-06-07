import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {
    Icon,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ListBusConts } from '../../commons/Constants';
import { locale } from '../../commons/Config'
import TabNavigator from './TabNavigator';

const today = new Date();

export default class ListBus extends Component {
    static navigationOptions = {
        headerLeft: null,
    }

    static router = TabNavigator.router;

    constructor(props) {
        super(props);

        this.state = {
            date: today,
            day: today.getDate(),
            month: (today.getMonth() + 1),
            year: today.getFullYear(),
            fullDate: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
            isDateTimePickerVisible: false,
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
                    <TouchableOpacity
                        style={styles.button_search}
                        onPress={() => { this._getListChuyenDi() }}
                    >
                        <Icon
                            name="ios-search"
                            style={styles.icon_search}
                        />
                    </TouchableOpacity>
                </View>

                <TabNavigator navigation={this.props.navigation} screenProps={{ date: this.state.fullDate }} />

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

    _handleDatePicked = (date) => {
        this.setState({
            fullDate: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
        });
        this._hideDateTimePicker();
    };

    _getListChuyenDi() {
        // this.setState(
        //     fullDate: 
        // );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        alignItems: 'center',
        top: 80,
        paddingRight: 20,
        paddingLeft: 20
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
        borderColor: '#ccc',
    },
});