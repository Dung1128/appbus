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
import { InputSerialTicket } from '../../actions/Actions';
import { TabManage } from '../../commons/Screen';
import { ErrorServer, LoadingStr } from '../../commons/Constants';
import fetchData from '../../utils/ConnectAPI';

class CategoryTicket extends Component {
    static navigationOptions = {
        headerLeft: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            arrCategoryTicket: [],
            loading: true,
        }
    }

    async componentWillMount() {
        try {
            let userInfo = this.props.userInfo;

            let params = {
                token: userInfo.token,
                adm_id: userInfo.adm_id,
            }

            let data = await fetchData('api_get_category_ticket', params, 'POST');

            if (data && data.status_code == 200) {
                this.setState({
                    arrCategoryTicket: data.arrData,
                    loading: false,
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
        let htmlCategoryTicket = [];
        let arrCategoryTicket = this.state.arrCategoryTicket;

        if (arrCategoryTicket != undefined) {
            for (let i = 0; i < arrCategoryTicket.length; i++) {
                let itemCategoryTicket = arrCategoryTicket[i];
                htmlCategoryTicket.push(
                    <CardItem
                        button
                        bordered={true}
                        key={'bus_' + i}
                        style={styles.card_style}
                        onPress={this.chooseCategoryTicket.bind(this, itemCategoryTicket)}
                    >
                        <View>
                            <Text>
                                {itemCategoryTicket.bvd_ma_ve}
                            </Text>
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
                        style={styles.view_load}
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
                            {htmlCategoryTicket}
                        </Card>
                    </ScrollView>
                }
            </View>
        );
    }

    chooseCategoryTicket(categoryTicket) {
        this.props.dispatch(InputSerialTicket(categoryTicket));
        this.props.navigation.navigate(TabManage);
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.AuthenticationReducer.userInfo,
    }
}

export default connect(mapStateToProps)(CategoryTicket);

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
    view_load: {
        alignItems: 'center'
    },
});