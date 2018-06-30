import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {
    Card,
    CardItem,
    Spinner,
} from 'native-base';
import { TabManage } from '../../commons/Screen';
import { GetInfoRoute } from '../../actions/Actions';
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import { LoadingStr, ListTripDt } from '../../commons/Constants';

const heightDevice = Dimensions.get('window').height;

class ListTrips extends Component {
    constructor(props) {
        super(props);

        this.navigation = this.props.navigation;
    }

    render() {
        return (
            <ScrollView
                keyboardShouldPersistTaps="always"
            >
                {this.props.loading &&
                    <View
                        style={styles.load_style}
                    >
                        <Spinner />
                        <Text>
                            {LoadingStr}
                        </Text>
                    </View>
                }

                {!this.props.loading &&
                    this._renderListChuyenDi()
                }
            </ScrollView>
        )
    }

    _renderListChuyenDi() {
        let arrListTrips = this.props.arrListTrips,
            html = [],
            htmlChild = [],
            SECTIONS = [];

        if (!arrListTrips || arrListTrips.length < 1) {
            htmlChild.push(
                <CardItem
                    key="data_null"
                >
                    <View>
                        <Text>{ListTripDt.NoTripsStr}</Text>
                    </View>
                </CardItem>
            );
        }

        for (let i = 0; i < arrListTrips.length; i++) {
            if (arrListTrips[i].arrNodes) {
                SECTIONS.push({
                    title: arrListTrips[i],
                    content: arrListTrips[i].arrNodes,
                });
            }
        }

        html.push(
            <Card
                key="group_card"
                style={{ marginTop: 0 }}
            >
                {htmlChild}
            </Card>
        );

        html.push(
            <Card
                key="scroll_autocomplate1"
                style={styles.card_body_style}
            >
                <Accordion
                    sections={SECTIONS}
                    renderHeader={this._renderHeader.bind(this)}
                    renderContent={this._renderContent.bind(this)}
                />
            </Card>
        );

        return html;
    }

    _renderHeader(section) {
        return (
            <CardItem
                bordered={true}
                style={styles.card_header}
            >
                <View
                    style={styles.view_header}
                >
                    <Text>
                        {section.title.tuy_ten}
                    </Text>
                    {section.title.tuy_ma && section.title.tuy_ma.trim() != '' &&
                        <Text>
                            {section.title.tuy_ma}
                        </Text>
                    }
                    <Text>
                        {section.title.tuy_hanh_trinh}
                    </Text>

                </View>
            </CardItem>
        );
    }

    _renderContent(section) {
        let html = [],
            SECTIONS = [];

        for (let i = 0; i < section.content.length; i++) {
            SECTIONS.push({
                title: section.content[i],
                content: section.content[i].arrBusNotGio,
                data: section.title,
            });
        }

        html.push(
            <View
                key='scroll'
                style={[styles.view_content, {height: heightDevice}]}
            >
                <ScrollView>
                    <Accordion
                        sections={SECTIONS}
                        renderHeader={this._renderHeaderChild.bind(this)}
                        renderContent={this._renderContentChild.bind(this)}
                    />
                </ScrollView>
            </View>
        );
        return (
            html
        );
    }

    _renderHeaderChild(section) {
        return (
            <CardItem
                bordered={true}
                style={styles.card_header}
            >
                <View
                    style={styles.view_header}
                >
                    <Text>
                        {section.title.bun_name} {ListTripDt.Shift} {section.title.did_not_ca}
                    </Text>
                    <Text>
                        {ListTripDt.Driver} {section.title.lai_xe_text}
                    </Text>
                    <Text>
                        {ListTripDt.Waiter} {section.title.ban_ve_text}
                    </Text>
                    <Text>
                        {ListTripDt.lp} {section.title.xe_text}
                    </Text>
                </View>
            </CardItem>
        );
    }

    _renderContentChild(section) {
        let html = [];

        for (let i = 0; i < section.content.length; i++) {
            html.push(
                <View
                    key={'child' + i}
                    style={styles.view_content}
                >
                    <TouchableOpacity
                        onPress={this.checkStartOrHandle.bind(this, section.title, section.content[i], section.data)}
                    >
                        <Text>
                            {section.content[i].gio_xuat_ben}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            html
        );
    }

    checkStartOrHandle(title, content, data) {
        try {
            this.navigation.navigate(TabManage);
            this.props.dispatch(GetInfoRoute({ title, content, data }));
        } catch (error) {
            console.log(error);
        }
    }
}

export default connect()(ListTrips);

const styles = StyleSheet.create({
    view_content: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 45,
        margin: 5
    },
    view_header: {
        flex: 1,
        // flexDirection: 'row',
    },
    card_header: {
        shadowOpacity: 0,
        shadowColor: 'red',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    card_body_style: {
        overflow: 'hidden',
    },
    load_style: {
        alignItems: 'center',
    },
})