import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import ListTrips from './ListTrips';

export default class Outbound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            arrListTrips: [],
        }
    }

    componentWillMount() {
        let arrListTrips = [
            {
                did_id: '1',
                currentId: '2',
                not_chieu_di: '',
                urlImg: '',
                color_loai_xe: '',
                bien_kiem_soat: '123',
                did_gio_dieu_hanh: '20h',
                did_gio_xuat_ben_that: '20h30',
                tuy_ten: 'HN - Lao Cai',
            }
        ];

        this.setState({
            arrListTrips: arrListTrips,
        });

        console.log('outbound');
    }

    render() {
        console.log('outbound render');
        return (
            <ListTrips
                navigation={this.props.navigation}
                arrListTrips={this.state.arrListTrips}
                loading={this.state.loading}
            />
        )
    }
}