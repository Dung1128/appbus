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
import { InputDriverName } from '../../actions/Actions';
import { TabManage } from '../../commons/Screen';
import { ErrorServer, LoadingStr } from '../../commons/Constants';
import fetchData from '../../utils/ConnectAPI';

class CategoryEmployees extends Component {
    static navigationOptions = {
        headerLeft: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            arrDriver: [],
            loading: true,
        }
    }

    async componentWillMount() {
        try {
            let paramsDriver = {
                token: this.props.userInfo.token,
                adm_id: this.props.userInfo.adm_id,
                type: '1',
            }

            let dataDriver = await fetchData('api_get_employees', paramsDriver, 'POST');

            if (dataDriver && dataDriver.status_code == 200) {
                this.setState({
                    arrDriver: dataDriver.arrNhanVien,
                    loading: false,
                });
                
            } else {
                if (dataDriver) {
                    alert(dataDriver.message);
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
        let htmlCategoryEmployees = [];
        let arrCategoryEmployees = this.state.arrDriver;

        if (arrCategoryEmployees != undefined) {
            for (let i = 0; i < arrCategoryEmployees.length; i++) {
                let itemCategoryEmployees = arrCategoryEmployees[i];
                htmlCategoryEmployees.push(
                    <CardItem
                        button
                        bordered={true}
                        key={'bus_' + i}
                        style={styles.card_style}
                        onPress={this.chooseCategoryEmployees.bind(this, itemCategoryEmployees)}
                    >
                        <View>
                            <Text>
                                {itemCategoryEmployees.adm_ten}
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
                            {htmlCategoryEmployees}
                        </Card>
                    </ScrollView>
                }
            </View>
        );
    }

    chooseCategoryEmployees(categoryEmployees) {
        this.props.dispatch(InputDriverName(categoryEmployees));
        this.props.navigation.navigate(TabManage);
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.AuthenticationReducer.userInfo,
    }
}

export default connect(mapStateToProps)(CategoryEmployees);

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