import React, { Component } from 'react';
import {
    View,
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
import { Sign, ErrorAcc, ErrorPass, ErrorServer, UserInfos, LoadingStr } from '../../commons/Constants'
import { ListBus } from '../../commons/Screen';

const api_login = 'api_login';

class Login extends Component {
    static navigationOptions = {
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

        this.navigate = this.props.navigation.navigate;
    }

    async componentWillMount() {
        try {
            let dataUser = await StorageHelper.getStore(UserInfos);

            if (dataUser) {
                let params = {
                    type: 'checkTokenLogin',
                    token: dataUser.token,
                }

                let data = await fetchData(api_login, params, 'POST');

                if (data && data.status_code == 200) {
                    this.props.dispatch(Authentication(dataUser));
                    this.navigate(ListBus);
                    this.setState({
                        loading: false,
                    });
                } 
                else {
                    if (data) {
                        this.setState({
                            error: true,
                            messageError: data.message,
                            loading: false,
                        });
                    }
                    else {
                        this.setState({
                            error: true,
                            messageError: ErrorServer,
                            loading: false,
                        });
                    }
                }
            }
            else {
                this.setState({
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                error: true,
                loading: false,
                messageError: ErrorServer
            });
            console.log(error);
        }
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <StatusBar
                    hidden={true}
                />
                {this.state.loading &&
                    <View
                        style={{ alignItems: 'center' }}
                    >
                        <Spinner />
                        <Text>
                            {LoadingStr}
                        </Text>
                    </View>
                }
                {!this.state.loading &&
                    <ScrollView>
                        {this.renderHtml()}
                    </ScrollView>
                }
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
                    <Text
                        style={styles.login_text_style}
                    >
                        {Sign.SignIn}
                    </Text>
                </Button>
            </View>
        );

        return htmlContent;
    }

    async handleLogin() {
        try {
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

            let data = await fetchData(api_login, params, 'POST');

            if (data && data.status_code == 200) {
                StorageHelper.setStore(UserInfos, data);
                this.props.dispatch(Authentication(data));
                this.navigate(ListBus);
                this.setState({
                    loading: false,
                });
            } else {
                if (data) {
                    this.setState({
                        error: true,
                        messageError: data.message,
                        loading: false,
                    });
                }
                else {
                    this.setState({
                        error: true,
                        messageError: ErrorServer,
                        loading: false,
                    });
                }
            }
        } catch (e) {
            this.setState({
                error: true,
                messageError: ErrorServer,
                loading: false,
            });
            console.log(e);
        }
    }
}

export default connect()(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    login_button_style: {
        marginTop: 10,
        height: 60,
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