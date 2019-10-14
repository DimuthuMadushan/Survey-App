import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Alert} from 'react-native';

export default class SignUpScreen extends Component {
  static navigationOptions = {  
    title: 'Sign Up',
    headerStyle: {  
        backgroundColor: '#4b0082',  
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
  render(){
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.firstName}
          onChangeText={(firstName) => this.setState({firstName})}
          placeholder={'First Name'}
          secureTextEntry={true}
          placeholderTextColor='#4b0082'
          style={styles.input}
        />
        <TextInput
          value={this.state.lastName}
          onChangeText={(lastName) => this.setState({ lastName})}
          placeholder={'Last Name'}
          secureTextEntry={true}
          placeholderTextColor='#4b0082'
          style={styles.input}
        />
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
          onPress={() => {Alert.alert("Entered")}}
          underlayColor='#4b0082'>
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
});