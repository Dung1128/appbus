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
import { InputVehicle } from '../../actions/Actions';
import { TabManage } from '../../commons/Screen';
import { ErrorServer, LoadingStr } from '../../commons/Constants';
import fetchData from '../../utils/ConnectAPI';

class CategoryVehicle extends Component {
    static navigationOptions = {
        headerLeft: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            arrVehicle: [],
            loading: true,
        }
    }

    async componentWillMount() {
        try {
            let paramsVehicle = {
                token: this.props.userInfo.token,
                adm_id: this.props.userInfo.adm_id,
            }

            let dataVehicle = await fetchData('api_get_vehicle', paramsVehicle, 'POST');

            if (dataVehicle && dataVehicle.status_code == 200) {
                this.setState({
                    arrVehicle: dataVehicle.arrXe,
                    loading: false,
                });
            } else {
                if (dataVehicle) {
                    alert(dataVehicle.message);
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
        let htmlCategoryVehicle = [];
        let arrCategoryVehicle = this.state.arrVehicle;

        if (arrCategoryVehicle != undefined) {
            for (let i = 0; i < arrCategoryVehicle.length; i++) {
                let itemCategoryVehicle = arrCategoryVehicle[i];
                htmlCategoryVehicle.push(
                    <CardItem
                        button
                        bordered={true}
                        key={'bus_' + i}
                        style={styles.card_style}
                        onPress={this.chooseCategoryVehicle.bind(this, itemCategoryVehicle)}
                    >
                        <View>
                            <Text>
                                {itemCategoryVehicle.bien_kiem_soat}
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
                            {htmlCategoryVehicle}
                        </Card>
                    </ScrollView>
                }
            </View>
        );
    }

    chooseCategoryVehicle(categoryVehicle) {
        this.props.dispatch(InputVehicle(categoryVehicle));
        this.props.navigation.navigate(TabManage);
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.AuthenticationReducer.userInfo,
    }
}

export default connect(mapStateToProps)(CategoryVehicle);

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