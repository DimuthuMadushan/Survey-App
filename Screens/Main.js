import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Alert, Header} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';

const themeColor = '#4b0082';

export default class MainScreen extends Component {
  static navigationOptions = {  
    title: 'Profile',
    headerLeft: null,
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
    this.state = { currentUser: '' };
  }
  

  componentDidMount () {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${userId}/firstName`).on("value", snapshot => {
      this.setState({currentUser: snapshot.val()},
      ()=> {console.log(this.state.currentUser)}
      )
    })
    // this.setState(
    //   {currentUser: CurrentUser},
    //   ()=> {console.log(this.state.currentUser)}
    // )
  }

  logOut = () => {
    firebase.auth().signOut(),
    console.log('Logged out')
    //this.props.navigation.push('Home')
  }

  render(){
    return (
      <View>
        <Text style={{color:themeColor, fontSize: 25}}> 
          Hi, {this.state.currentUser}
        </Text>
        <TouchableHighlight
          onPress={this.logOut}
          underlayColor={themeColor}>
          <Text>
            Logout
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}