import React from 'react';
import {Button, Alert, Text, TextInput, StyleSheet, View} from 'react-native';

export default class WelcomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;
    Alert.alert ('Credentials', `${username} + ${password}`);
    };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username})}
          placeholder={'Username'}
          placeholderTextColor='#b0e0e6'
          style={styles.input}
        />

        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password})}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor='#b0e0e6'
          style={styles.input}
        />
        <Button
          title={'Login'}
          color='#008088'
          placeholderTextColor='#b0e0e6'
          style={styles.button}
          onPress={this.onLogin.bind(this)}
        />

        <Text style={{padding:20, alignContent: 'center', color: '#b0e0e6'}}>
          Don't have an account?
        </Text>
        <Button
        title={'Create Now'}
        color='#008088'
        style={styles.button}
        onPress={() => navigate('Profile', {name: 'Jane'})}
        />

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
    padding: 100,
    // backgroundColor: '#b0e0e6'
    backgroundColor: '#008089'
  },
  input: {
    textAlign: 'center',
    width: 350,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b0e0e6',
    marginBottom: 10,
    // backgroundColor: '#4682b4'
    backgroundColor: '#008082'
  },
  button: {
    borderColor: '#b0e0e6',
    width: 350,
  } 
  });