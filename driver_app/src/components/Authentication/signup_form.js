import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
 
import {Actions} from 'react-native-router-flux';
 
export default class SignUp_Form extends Component {
 
    constructor(props){
        super(props);
        this.state={
            phone:'',
            password: '',
            confirm_password: ''
        }
    }
 
    signup = async()=>{
        try{
            const {phone, password, confirm_password} = this.state;

            if (password !== confirm_password){
                alert('password and confirm password are not the same');
            }else {
                var result = false

                // Send In here
                let data = {
                    method: 'POST',
                    credentials: 'same-origin',
                    mode: 'same-origin',
                    body: JSON.stringify({
                        phone: phone,
                        password: password
                    }),
                    headers: {
                      'Accept':       'application/json',
                      'Content-Type': 'application/json',
                    }
                  }

                var result = await fetch('http://172.18.0.1:8080/driver/signup', data)
                    .then((response) => response.json())
                    .then((json) => {
                        return json
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                
                // handle the result
                if (result === true){
                    alert("New account have been created")
                    await AsyncStorage.setItem('loginCheck', "true");
                    await AsyncStorage.setItem('userPhone', phone);
                    this.props.navigation.navigate("App");
                }else {
                    alert("This phone number has already account")
                }
            }
        }catch(error)
        {
            alert(error);
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

                <TextInput style={styles.inputBox}
                onChangeText={(confirm_password) => this.setState({confirm_password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Confirm password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.signup}>Sign up</Text>
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