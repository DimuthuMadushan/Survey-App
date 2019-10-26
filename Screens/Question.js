import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView  } from 'react-native';
import Mcq from './components/Mcq.js';
import ProgressBar from './components/ProgressBar.js';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import LoadingView from './loading';

const themeColor = '#4b0082';

export default class QuestionScreen extends Component{
  _isMounted = false;
  constructor(props){
    super(props);

    this.state = {
      surveyId: this.props.navigation.state.params.ID,
      // surveyId: '-Ls5cSw1d80_DLALk52_',
      // surveyId: '',
      questions: [],
      curQuIndex: 1,
    };
  }

  componentDidMount(){
    this._isMounted = true;
    var surveyID = this.state.surveyId;
    firebase.database().ref(`surveys/${surveyID}/`).once("value", snapshot => {
      if (this._isMounted){
        var snapshot = JSON.parse(JSON.stringify(snapshot));
        var array = []
        for (ID in snapshot.questions){
          array.push(snapshot.questions[ID]);
        }
        this.setState({questions: array});
        console.log(array);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.questions == ''){
      return (
        <LoadingView/>
      )
    }
    else {
      var quizes = this.state.questions;
      var index = this.state.curQuIndex;
      var progress = ((index-1)/(quizes.length-1))*100+'%';
      console.log(progress)
      if (index === 1){
        return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:themeColor}}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Question {this.state.curQuIndex}</Text>
            </View> 
            <View style={[styles.progressBar,{flex:1}]}>
              <ProgressBar prog={progress}/>
            </View>
            <View style={[styles.body,{flex:7}]}>
              <Mcq q={quizes[this.state.curQuIndex]}/>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity 
                style={styles.touchable}
                onPress={() => {this.props.navigation.navigate('Main')}}>
                <Text style={styles.touchtext}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable}
              onPress={() => {this.setState({curQuIndex: index+1})}}>
                <Text style={styles.touchtext}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      else if (index === quizes.length-1){
        return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:themeColor}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Question {this.state.curQuIndex}</Text>
          </View> 
          <View style={[styles.progressBar,{flex:1}]}>
            <ProgressBar prog={progress}/>
          </View>
          <View style={[styles.body,{flex:7}]}>
            <Mcq q={quizes[this.state.curQuIndex]}/>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity style={styles.touchable}
              onPress={() => {this.setState({curQuIndex: index-1})}}>
                <Text style={styles.touchtext}>
                  Back
                </Text>
              </TouchableOpacity>
            <TouchableOpacity 
              style={styles.touchable}
              onPress={() => {
                this.props.navigation.navigate('Main');
                }
              }>
              <Text style={styles.touchtext}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )
      }
      else {
        return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:themeColor}}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Question {this.state.curQuIndex}</Text>
            </View> 
            <View style={[styles.progressBar,{flex:1}]}>
              <ProgressBar prog={progress}/>
            </View>
            <View style={[styles.body,{flex:7}]}>
              <Mcq q={quizes[this.state.curQuIndex]}/>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity style={styles.touchable}
              onPress={() => {this.setState({curQuIndex: index-1})}}>
                <Text style={styles.touchtext}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.touchable}
                onPress={() => {this.props.navigation.navigate('Main')}}>
                <Text style={styles.touchtext}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable}
              onPress={() => {this.setState({curQuIndex: index+1})}}>
                <Text style={styles.touchtext}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }
}


const styles = StyleSheet.create({

  headerContainer: {
    padding: 20,
    alignSelf:'center',
    backgroundColor: themeColor,   
    alignItems:'center',
  },
  body: {
    backgroundColor: themeColor,
    margin:2,
    borderColor:themeColor,
    borderWidth:4,
  },
  question:{
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  headerTitle: {
    alignSelf: 'flex-start',
    fontSize: 36,
    margin: 10,
    fontWeight:'bold',
    color:'white',
  },
  progressBar:{
    justifyContent:'space-around',
  },
  footerButton:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color:'red',
    height: 10,
    width: 430
  },
  title:{
    fontSize:20,
  },
  touchable: {
    height: 40,
    width: 80,
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




