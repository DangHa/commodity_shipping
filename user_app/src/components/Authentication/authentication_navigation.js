import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity} from 'react-native';

import {Actions, Router, Stack, Scene} from 'react-native-router-flux';

import SignIn_Form from './signin_form';
import SignUp_Form from './signup_form';

class SignIn extends Component {
    signup() {
        Actions.signup()
    }

    render() {
        return(
        <View style={styles.container}>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <SignIn_Form {...this.props}/>
            <View style={styles.signupTextCont}> 
            <Text style={styles.signupText}>Dont have an account yet? </Text>
            <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
            </View>
        </View>
        )
    }
}

class SignUp extends Component {
    goBack() {
        Actions.pop()
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <SignUp_Form {...this.props}/>
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default class AuthenticationNavigator extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: 'tomato',}} 
                titleStyle={{color: 'white',}}
            >
                <Stack key="root">
                    <Scene {...this.props} key="signin" component={SignIn} title="Sign in"/>
                    <Scene {...this.props} key="signup" component={SignUp} title="Sign up"/>
                </Stack>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: '#12799f', 
        fontSize:16,
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
    },
    barButtonIconStyle: {
        tintColor: 'white'
    }
});