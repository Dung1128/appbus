import React, { Component } from 'react';
import ListTrips from './ListTrips';

export default class Outbound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListTrips
                navigation={this.props.navigation}
                arrListTrips={this.props.screenProps.arrOutbound}
                loading={this.props.screenProps.loading}
            />
        )
    }
}