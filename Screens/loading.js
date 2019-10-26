import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const themeColor = '#4b0082';

export default class LoadingView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:themeColor, fontSize: 25}}>Loading..</Text>
                <Text style={{color:themeColor, fontSize: 25}}>Please wait</Text>
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