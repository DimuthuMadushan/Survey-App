import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import { NavigationActions, navigation} from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {  
    title: 'Welcome',
    headerStyle: {  
      backgroundColor: '#4b0082',  
    },  
    headerTitleStyle: {
      alignSelf: 'center',
      color: '#ffffff',  
      fontWeight: 'bold',  
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleLogin = () => {
  const { email, password } = this.state
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          //() => this.props.navigation.navigate('Main')
          )
        .catch(error => {
          console.log(error.code)
          if (error.code == 'auth/wrong-password' || error.code == 'auth/unknown') {
            Alert.alert('Wrong password!')
          }
          if (error.code == 'auth/invalid-email') {
            Alert.alert('Wrong email!')
          }
          this.setState({ errorMessage: error.message })
        })
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./../images/appIcon.png')}/>
        <Text style={styles.text}>
          Sign in to continue
        </Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email})}
          placeholder={'Email'}
          placeholderTextColor='#4b0082'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password})}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor='#4b0082'
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            if (!this.state.email || !this.state.password) {
              Alert.alert('Empty inputs found!')
            }
            else {
              console.log('inputs ok')
              this.handleLogin()
            }
          }}
          underlayColor='#4b0082'>
          <Text style={styles.touchtext}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            this.props.navigation.navigate('Signup')
          }}
          underlayColor='#4b0082'>
          <Text style={styles.touchtext}>
            SIGN UP
          </Text>
        </TouchableOpacity>
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
    borderColor: '#4b0082',
    borderWidth: 3,
    marginBottom: 10,
  },
  touchable: {
    alignSelf: 'center',
    height: 40,
    width: 150,
    padding: 0,
    borderRadius: 25,
    backgroundColor: '#4b0082',
    borderColor: '#4b0082'
  },
  touchtext: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  text: {
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'left', 
    color: '#4b0082', 
    fontSize: 20} 
  },
);