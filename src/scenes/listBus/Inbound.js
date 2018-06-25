import React, { Component } from 'react';
import ListTrips from './ListTrips';

export default class Inbound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListTrips
                navigation={this.props.navigation}
                arrListTrips={this.props.screenProps.arrInbound}
                loading={this.props.screenProps.loading}
            />
        )
    }
}