import React, { Component } from 'react';
import {
    View,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';

import {
    InputGroup,
    Icon,
    Input,
    Text,
    Button,
    Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { Authentication } from '../../actions/Actions';
import fetchData from '../../utils/ConnectAPI';
import StorageHelper from '../../utils/StorageHelper';
import { ColorHeader, Sign, ErrorAcc, ErrorPass } from '../../commons/Constants'
import { ListBus } from '../../commons/Screen';

const userInfo = 'userInfo';

class Login extends Component {
    static navigationOptions = {
        drawerLabel: 'Đăng xuất',
        drawerIcon: <Icon name="ios-contact" />,
        headerRight: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            messageError: '',
            username: '',
            password: '',
            loading: true,
        }
    }

    async componentWillMount() {
        const { navigate } = this.props.navigation;

        try {
            let dataUser = await StorageHelper.getStore(userInfo);

            if (dataUser) {
                let params = {
                    type: 'checkTokenLogin',
                    token: dataUser.token
                }

                // let data = await fetchData('login', params, 'POST');
                // if (data.status == 200) {
                //     // Actions.home({ title: 'Trang Chủ', data: jsonDataUser });
                // } else {
                //     this.setState({
                //         error: true,
                //         loading: false,
                //         messageError: 'Tài khoản của bạn đang đăng nhập ở thiết bị khác. Vui lòng đăng nhập lại '
                //     });
                // }
            }

        } catch (error) {
            this.setState({
                error: 'true',
                loading: false,
                messageError: 'Lỗi hệ thống. Vui lòng liên hệ với bộ phận Kỹ Thuật.'
            });
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ScrollView>
                    {this.renderHtml()}
                </ScrollView>
            </View>
        );
    }

    renderHtml() {
        let htmlContent = [],
            htmlGroup = [],
            arrValid = [];

        if (this.state.error) {
            htmlGroup.push(
                <InputGroup
                    key="group_username"
                    style={styles.input_group_style} error
                >
                    <Icon
                        name='ios-person'
                        style={styles.icon_style}
                    />
                    <Input
                        style={styles.input_style}
                        placeholder={Sign.Account}
                        onChange={
                            (event) => this.setState({ username: event.nativeEvent.text })
                        }
                    />
                </InputGroup>
            );

            htmlGroup.push(
                <InputGroup
                    key="group_password"
                    style={styles.input_group_style}
                    error
                >
                    <Icon
                        name='ios-unlock'
                        style={styles.icon_style}
                    />
                    <Input
                        style={styles.input_style}
                        placeholder={Sign.Pass}
                        secureTextEntry={true}
                        onChange={
                            (event) => this.setState({ password: event.nativeEvent.text })
                        }
                    />
                </InputGroup>
            );
        } else {
            htmlGroup.push(
                <InputGroup
                    key="group_username"
                    style={styles.input_group_style}
                >
                    <Icon name='ios-person' />
                    <Input
                        style={styles.input_style}
                        placeholder={Sign.Account}
                        onChange={
                            (event) => this.setState({ username: event.nativeEvent.text })
                        }
                    />
                </InputGroup>
            );

            htmlGroup.push(
                <InputGroup
                    key="group_password"
                    style={[styles.input_group_style, { marginTop: 5, marginBottom: 10 }]}
                >
                    <Icon name='ios-unlock' />
                    <Input
                        style={styles.input_style}
                        placeholder={Sign.Pass}
                        secureTextEntry={true}
                        onChange={
                            (event) => this.setState({ password: event.nativeEvent.text })
                        }
                    />
                </InputGroup>
            );
        }

        if (this.state.messageError != '') {
            arrValid.push(
                <Text
                    style={styles.error_mes_style}
                    key="username_vl"
                >
                    {this.state.messageError}
                </Text>
            );
        }

        htmlContent.push(
            <View
                key="content_login"
                style={styles.content_style}
            >
                {htmlGroup}
                {arrValid}
                <Button
                    block
                    style={styles.login_button_style}
                    onPress={this.handleLogin.bind(this)}
                >
                    <Text style={styles.login_text_style}>
                        {Sign.SignIn}
                    </Text>
                </Button>
            </View>
        );

        return htmlContent;
    }

    async handleLogin() {
        try {
            const { navigate } = this.props.navigation;

            if (this.state.username.trim() == '' || this.state.username == null) {
                this.setState({
                    error: true,
                    messageError: ErrorAcc
                });
                return;
            }

            if (this.state.password.trim() == '' || this.state.password == null) {
                this.setState({
                    error: true,
                    messageError: ErrorPass
                });
                return;
            }

            let params = {
                type: 'login',
                username: this.state.username,
                password: this.state.password,
            }

            let data = await fetchData('login', params, 'POST');
            console.log(data);

            if (data) {
                if (data.status == 200) {
                    navigate(ListBus);
                    StorageHelper.setStore(userInfo, data);
                    this.props.dispatch(Authentication(data));
                } else {
                    this.setState({
                        error: true,
                        messageError: 'Tài khoản hoặc Mật Khẩu không đúng.'
                    });
                }
            }
        } catch (e) {
            this.setState({
                error: true,
                messageError: 'Lỗi hệ thống. Vui lòng liên hệ với bộ phận Kỹ Thuật.'
            });
            console.log(e);
        }
    }
}

const mapStateToProps = state => {
    console.log('state login');
    console.log(state);
    return {
        textResult: state,
    }
}

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        backgroundColor: 'rgba(255, 220, 66, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image_header: {
        resizeMode: 'contain',
    },
    login_button_style: {
        marginTop: 10,
        height: 60,
        backgroundColor: ColorHeader,
    },
    login_text_style: {
        color: 'black',
    },
    content_style: {
        padding: 30
    },
    error_mes_style: {
        color: 'red',
        marginTop: 10,
    },
    input_style: {
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    input_group_style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    icon_style: {
        color: 'red',
    }
});