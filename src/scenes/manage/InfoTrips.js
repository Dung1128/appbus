import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Card,
    CardItem,
    Text,
} from 'native-base';
import { connect } from 'react-redux';
import { InfoTripsStr } from '../../commons/Constants';

class InfoTrips extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let Info = this.props.InfoTrips;

        return (
            <Card style={[styles.paddingContent]}>
                <CardItem
                    header
                    bordered={true}
                    style={styles.cardItem_style}
                >

                    <View
                        style={styles.view_style}
                    >
                        {this.renderInfo()}
                    </View>
                    {/* {Info &&
                        <View
                            style={styles.view_style}
                        >
                            {Info.data &&
                                Info.content &&
                                <Text style={styles.bold}>
                                    {Info.data.tuy_ten}  {Info.content.gio_xuat_ben}
                                </Text>
                            }

                            {Info.title &&
                                <Text
                                    style={styles.bold}
                                >
                                    {Info.title.bun_name}
                                </Text>
                            }

                            {Info.data &&
                                Info.data.tuy_hanh_trinh &&
                                Info.data.tuy_hanh_trinh.trim() != '' &&
                                <Text
                                    style={styles.bold}
                                >
                                    {Info.data.tuy_hanh_trinh}
                                </Text>
                            }

                            {Info.content &&
                                Info.content.xe_text &&
                                Info.content.xe_text.trim() != '' &&
                                <Text
                                    style={styles.bold}
                                >
                                    {Info.content.xe_text}
                                </Text>
                            }

                            {Info.content &&
                                Info.content.lai_xe_text &&
                                Info.content.lai_xe_text.trim() != '' &&
                                <Text>
                                    {InfoTripsStr.Driver}
                                    <Text
                                        style={styles.bold}
                                    >
                                        {Info.content.lai_xe_text}
                                    </Text>
                                </Text>
                            }

                            {Info.content &&
                                Info.content.ban_ve_text &&
                                Info.content.ban_ve_text.trim() != '' &&
                                <Text>
                                    {InfoTripsStr.Waiter}
                                    <Text
                                        style={styles.bold}
                                    >
                                        {Info.content.ban_ve_text}
                                    </Text>
                                </Text>
                            }
                        </View>
                    } */}
                </CardItem>
            </Card>
        );
    }

    renderInfo() {
        let html = [];
        let Info = this.props.InfoTrips;

        if (Info) {
            if (Info.data && Info.content) {
                html.push(
                    <Text
                        key='bst'
                        style={styles.bold}
                    >
                        {Info.data.tuy_ten}  {Info.content.gio_xuat_ben}
                    </Text>
                );
            }

            if (Info.title) {
                html.push(
                    <Text
                        key='bn'
                        style={styles.bold}
                    >
                        {Info.title.bun_name}
                    </Text>
                );
            }

            if (Info.data &&
                Info.data.tuy_hanh_trinh &&
                Info.data.tuy_hanh_trinh.trim() != '') {
                html.push(
                    <Text
                        key='trip'
                        style={styles.bold}
                    >
                        {Info.data.tuy_hanh_trinh}
                    </Text>
                );
            }

            if (Info.content &&
                Info.content.xe_text &&
                Info.content.xe_text.trim() != '') {
                html.push(
                    <Text
                        key='vehicle'
                        style={styles.bold}
                    >
                        {Info.content.xe_text}
                    </Text>
                );
            }

            if (Info.content &&
                Info.content.lai_xe_text &&
                Info.content.lai_xe_text.trim() != '') {
                html.push(
                    <Text
                        key='driver'
                    >
                        {InfoTripsStr.Driver}
                        <Text
                            style={styles.bold}
                        >
                            {Info.content.lai_xe_text}
                        </Text>
                    </Text>
                );
            }

            if (Info.content &&
                Info.content.ban_ve_text &&
                Info.content.ban_ve_text.trim() != '') {
                html.push(
                    <Text
                        key='waiter'
                    >
                        {InfoTripsStr.Waiter}
                        <Text
                            style={styles.bold}
                        >
                            {Info.content.ban_ve_text}
                        </Text>
                    </Text>
                );
            }
        }

        return html;
    }
}

const mapStateToProps = state => {
    return {
        InfoTrips: state.TripsReducer.route,
    }
}

export default connect(mapStateToProps)(InfoTrips);

const styles = StyleSheet.create({
    paddingContent: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    cardItem_style: {
        borderWidth: 1,
    },
    view_style: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 10,
    },
});
