import React, { Component } from 'react';
import {
    StyleSheet,
    View,
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
import { ColorHeader, Shift } from '../../commons/Constants';
import { GroupNodes } from '../../commons/Screen';
import { InputShiftStart } from '../../actions/Actions';
import { SHIFTSTARTKM } from '../../actions/Types'

class ShiftStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmStart: '',
        }
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <InputGroup
                    style={styles.inputgroup_style}
                >
                    <Icon name='md-star' />
                    <Input
                        style={styles.input_style}
                        placeholder={Shift.Start}
                        keyboardType='numeric'
                        onChangeText={(kmStart) => this.setState({ kmStart: kmStart })}
                    />
                </InputGroup>
                <Button
                    block
                    style={styles.confirm_button_style}
                    onPress={this.handleInputKMStart.bind(this)}
                >
                    <Text
                        style={styles.confirm_text_style}
                    >
                        {Shift.Confirm}
                    </Text>
                </Button>
            </View>
        );
    };

    handleInputKMStart() {
        this.props.dispatch(InputShiftStart(this.state.kmStart));
        this.props.navigation.navigate(GroupNodes);
    }
}

export default connect()(ShiftStart);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    inputgroup_style: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        marginTop: 20,
        marginHorizontal: 30,
    },
    input_style: {
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    confirm_text_style: {
        color: 'black',
    },
    confirm_button_style: {
        marginTop: 20,
        marginHorizontal: 30,
        height: 60,
        backgroundColor: ColorHeader,
    },
});