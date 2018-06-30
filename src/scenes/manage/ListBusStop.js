import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {
    Card,
    CardItem,
    Icon,
    Text,
    Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { InputBusStop } from '../../actions/Actions';
import { TabManage } from '../../commons/Screen';
import { LoadingStr, ErrorServer } from '../../commons/Constants';
import fetchData from '../../utils/ConnectAPI';

class ListBusStop extends Component {
    static navigationOptions = {
        headerLeft: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            arrBusStop: [],
            loading: true,
        }
    }

    async componentWillMount() {
        try {
            let userInfo = this.props.userInfo,
                tripsInfo = this.props.tripsInfo;

            let params = {
                token: userInfo.token,
                adm_id: userInfo.adm_id,
                tuy_id: tripsInfo.data.tuy_id,
                dig_id: tripsInfo.content.dig_id,
            }

            let data = await fetchData('api_get_bus_stop', params, 'POST');

            if (data && data.status_code == 200) {
                this.setState({
                    arrBusStop: data.arrData,
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
        let htmlBusStop = [];
        let arrBusStop = this.state.arrBusStop;

        if (arrBusStop != undefined) {
            for (let i = 0; i < arrBusStop.length; i++) {
                let itemBusStop = arrBusStop[i];
                htmlBusStop.push(
                    <CardItem
                        button
                        bordered={true}
                        key={'bus_' + i}
                        style={styles.card_style}
                        onPress={this.chooseLocation.bind(this, itemBusStop)}
                    >
                        <View>
                            <Text>{itemBusStop.ddt_name}</Text>
                        </View>
                    </CardItem>
                );
            }
        }

        return (
            <View
                key="1"
                style={styles.view_style}
            >
                <View
                    style={styles.close_popup}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(TabManage)}
                        style={styles.touch_style}
                    >
                        <Icon
                            name="md-close"
                            style={styles.icon_style}
                        />
                    </TouchableOpacity>
                </View>

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
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                    >
                        <Card
                            key="group_card_bx"
                        >
                            {htmlBusStop}
                        </Card>
                    </ScrollView>
                }
            </View>
        );
    }

    chooseLocation(busStopInfo) {
        this.props.dispatch(InputBusStop(busStopInfo));
        this.props.navigation.navigate(TabManage);
    }
}

const mapStateToProps = state => {
    return {
        tripsInfo: state.TripsReducer.route,
        userInfo: state.AuthenticationReducer.userInfo,        
    }
}

export default connect(mapStateToProps)(ListBusStop);

const styles = StyleSheet.create({
    close_popup: {
        marginRight: 10
    },
    card_style: {
        shadowOpacity: 0,
        shadowColor: 'red',
        paddingTop: 10,
    },
    view_style: {
        paddingTop: 10,
        position: 'relative',
        paddingBottom: 30
    },
    touch_style: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    icon_style: {
        fontSize: 30
    },
    load_style: {
        alignItems: 'center',
    },
});