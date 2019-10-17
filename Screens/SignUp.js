import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

// const themeColor = '#2f4f4f';
const themeColor = '#4b0082'

export default class SignUpScreen extends Component {
  static navigationOptions = {  
    title: 'Sign Up',
    headerStyle: {  
        backgroundColor: themeColor,  
    },  
    headerTitleStyle: {
        color: '#ffffff',  
        fontWeight: 'bold',  
    },  
  };
    constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  handleSignUp = () => {
    console.log("handle sign up")
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then( (res) => {
          console.log(res.user.uid)
          firebase.database().ref('users/' + res.user.uid).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            })
            console.log('Logged in')
            this.props.navigation.navigate('Main')      
        }
      )
      .catch(error => {
        switch(error.code) {
          case 'auth/email-already-in-use':
                Alert.alert('Email already in use !')
                break;
          case 'auth/weak-password':
                Alert.alert('Password should be at least 6 characters!')
                break;
        }
        console.log(error)
        this.setState({ errorMessage: error.message })
      })
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.firstName}
          onChangeText={(firstName) => this.setState({firstName})}
          placeholder={'First Name'}
          placeholderTextColor={themeColor}
          style={styles.input}
        />
        <TextInput
          value={this.state.lastName}
          onChangeText={(lastName) => this.setState({ lastName})}
          placeholder={'Last Name'}
          placeholderTextColor={themeColor}
          style={styles.input}
        />
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email})}
          placeholder={'Email'}
          placeholderTextColor={themeColor}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password})}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor={themeColor}
          style={styles.input}
        />

        <TouchableHighlight
          style={styles.touchable}
          onPress={this.handleSignUp}
          underlayColor={themeColor}>
          <Text style={styles.touchtext}>
            Enter
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    backgroundColor: '#ffffff'
  },
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 380,
    height: 50,
    padding: 0,
    borderRadius: 25,
    borderColor: themeColor,
    borderWidth: 3,
    marginBottom: 10,
  },
  touchable: {
    alignSelf: 'center',
    height: 40,
    width: 150,
    padding: 0,
    borderRadius: 25,
    backgroundColor: themeColor,
  },
  touchtext: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
});