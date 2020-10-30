import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Transactions extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData : '',
            buttonState : "normal",
        }
    }

    getCameraPermissions= async() =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: "clicked",
            scanned: false,
        });
    }

    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal",
        });
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanButton;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned ? undefined:this.handleBarcodeScanned}
                style = {StyleSheet.absoluteFillObject} />

            )
        }else if(buttonState === "normal"){
            return(
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
            }}>
                    <TouchableOpacity style={styles.scanButton}
                                    onPress = {this.getCameraPermissions}
                    >
                        <Text>Scan QR Code</Text>
                    </TouchableOpacity>
                    <Text>This is issue or return screen</Text>
                </View>
        );
    }}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    displayText:{
        fontSize: 50,
        textDecorationLine: 'underline'
    },
    scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,
    },
    buttonText:{
        fontSize: 20
    }
});