// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Alert, Image} from 'react-native';
import { NavigationActions, navigation} from 'react-native'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import { useScreens } from 'react-native-screens';
import SignUpScreen from './Screens/SignUp';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';

var firebaseConfig = {
  apiKey: "AIzaSyAvYeeimfdUM7UM3SHQ2WKVWlyDcA3tXNc",
  authDomain: "firstapp-df3fa.firebaseapp.com",
  databaseURL: "https://firstapp-df3fa.firebaseio.com",
  projectId: "firstapp-df3fa",
  storageBucket: "firstapp-df3fa.appspot.com",
  messagingSenderId: "1018146079432",
  appId: "1:1018146079432:web:6a25bb613f7407bc6edbfd"
};


//firebase.initializeApp(firebaseConfig)

class HomeScreen extends React.Component {
  static navigationOptions = {  
    title: '     Welcome',
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

  onLogin() {
    const { email, password } = this.state;
    Alert.alert ('Credentials', `${email} + ${password}`);
    };
  
  handleLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(Alert.alert("signed in")).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
  signUp = () => {
    let newStack= NavigationActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({ routeName: SignUpScreen})
     ]
    })
    this.props.navigation.dispatch(newStack);
  }
  
  render() {
    //const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* <Text style={{color: '#4b0082', padding: 0, fontSize: 35, fontWeight: 'bold', textAlign: 'left'}}>
          Hello Surveyor!
        </Text> */}
        <Image source={{url: './images/icon.png'}} />
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

        <TouchableHighlight
          style={styles.touchable}
          onPress={this.handleLogin.bind(this)}
          underlayColor='#4b0082'>
          <Text style={styles.touchtext}>
            SIGN IN
          </Text>
        </TouchableHighlight>

        <Text style={styles.text}>
          Don't have an account?
        </Text>

        <TouchableHighlight
          style={styles.touchable}
          onPress={() => this.props.navigation.push('Signup')}
          underlayColor='#4b0082'>
            <Text style={styles.touchtext}>
            SIGN UP
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Signup: {
      screen: SignUpScreen
    }
  },
  {
    initialRouteName: "Home"
  },
);

export default createAppContainer(AppNavigator);

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
    //backgroundColor: '#4682b4'
    //backgroundColor: '#6495ed'
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
  });