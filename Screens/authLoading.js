import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

const themeColor = '#4b0082';

export default class authLoadingScreen extends Component {
    constructor(props) {
        super(props);
    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(!!user,"AUTH LOADING")
            this.props.navigation.navigate(user ? 'Main': 'Welcome')
        })
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:themeColor, fontSize: 25}}>Loading</Text>
        <ActivityIndicator color={themeColor} size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});