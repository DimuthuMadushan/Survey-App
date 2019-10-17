import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Alert, Image} from 'react-native';
import { NavigationActions, navigation} from 'react-native'
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth'
import { useScreens } from 'react-native-screens';
import SignUpScreen from './Screens/SignUp';
import MainScreen from './Screens/Main';
import WelcomeScreen from './Screens/Welcome';
import authLoadingScreen from './Screens/authLoading'
// import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';


const AppNavigator = createSwitchNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    Signup: {
      screen: SignUpScreen
    },
    Main: {
      screen: MainScreen,
      navigationOptions: { header: null }
    },
    AuthLoading: {
      screen: authLoadingScreen
    }
  },
  {
    initialRouteName: "AuthLoading"
  },
);

export default createAppContainer(AppNavigator);
// export default AppNavigator