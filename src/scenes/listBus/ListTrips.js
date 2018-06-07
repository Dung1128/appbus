import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
} from 'react-native';
import {
    Card,
    CardItem,
    Spinner,
} from 'native-base';
import { ShiftStart } from '../../commons/Screen';

export default class ListTrips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <ScrollView
                keyboardShouldPersistTaps="always"
            >
                {this.props.loading &&
                    <View
                        style={{ alignItems: 'center' }}
                    >
                        <Spinner />
                        <Text>Đang tải dữ liệu...</Text>
                    </View>}
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
            bg = '#ffffff';

        if (!arrListTrips || arrListTrips.length < 1) {
            htmlChild.push(
                <CardItem key="data_null">
                    <View>
                        <Text>Chưa có chuyến nào!</Text>
                    </View>
                </CardItem>
            );
        }

        for (let i = 0; i < arrListTrips.length; i++) {
            let dataNot = arrListTrips[i];
            let did_id = dataNot.did_id;
            let currentId = dataNot.currentId;
            let not_chieu_di = dataNot.not_chieu_di;

            if (dataNot.color_loai_xe.trim() != '') {
                bg = dataNot.color_loai_xe;
            }

            htmlChild.push(
                <CardItem
                    button
                    key={i}
                    style={{ shadowOpacity: 0, shadowColor: 'red', backgroundColor: bg }}
                    onPress={this.checkStartOrHandle.bind(this)}
                >
                    <View
                        style={{ flex: 1, flexDirection: 'row' }}
                    >
                        <View
                            style={{ flex: 3 }}
                        >

                            <Text
                                style={{ fontWeight: 'bold' }}
                            >
                                {dataNot.did_gio_dieu_hanh + ' ← ' + dataNot.did_gio_xuat_ben_that}
                            </Text>
                            {dataNot.bien_kiem_soat != '' && dataNot.bien_kiem_soat != null &&
                                <Text>
                                    Biển kiểm soát:
                                    <Text
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {dataNot.bien_kiem_soat}
                                    </Text>
                                </Text>
                            }
                            <Text>
                                {dataNot.tuy_ten}
                            </Text>
                            <Text>
                                Lái Xe 1:
                                <Text
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {dataNot.laixe1}
                                </Text>
                            </Text>
                            <Text>
                                Lái Xe 2:
                                <Text
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {dataNot.laixe2}
                                </Text>
                            </Text>
                            <Text>
                                Tiếp viên:
                                <Text
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {dataNot.tiepvien}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            {(dataNot.did_loai_xe != 0) && (dataNot.urlImg.trim() != '') &&
                                <Thumbnail size={60} source={{ uri: dataNot.urlImg }} />
                            }
                        </View>

                    </View>
                </CardItem>
            );
        }

        html.push(<Card key="group_card" style={{ marginTop: 0 }}>{htmlChild}</Card>);
        return html;
    }

    checkStartOrHandle() {
        this.props.navigation.navigate(ShiftStart);
    }
}