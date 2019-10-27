import React, {Component} from 'react';
import { useScreens } from 'react-native-screens';
import SignUpScreen from './Screens/SignUp';
import MainScreen from './Screens/Main';
import WelcomeScreen from './Screens/Welcome';
import authLoadingScreen from './Screens/authLoading'
import QuestionScreen from './Screens/Question'
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
    },
    SurveyScreen: {
      screen: QuestionScreen
    }
  },
  {
    initialRouteName: "AuthLoading"
  },
);

export default createAppContainer(AppNavigator);
