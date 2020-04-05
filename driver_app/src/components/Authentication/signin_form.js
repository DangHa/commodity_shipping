import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

import {Actions} from 'react-native-router-flux';
 
export default class SignIn_Form extends Component {
 
    constructor(props){
        super(props);
        this.state={
            phone:'',
            password: ''
        }
    }
 
    signin = async()=>{
        const {phone, password} = this.state;
        // Send In here

        //Get the result back

        // handle the result

        if (phone === '1' && password === '1'){
            this.props.navigation.navigate("App");
            await AsyncStorage.setItem('loginCheck', "true");
        }else {
            alert('phone: '+ phone + ' ' + 'password: ' + password);
        }
    }
 
    render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                onChangeText={(phone) => this.setState({phone})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Phone"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="numeric"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.signin}>Sign in</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});