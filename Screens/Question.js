import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView  } from 'react-native';
import Mcq from './components/Mcq.js';
import ProgressBar from './components/ProgressBar.js';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import LoadingView from './loading';

const themeColor = '#4b0082';

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



export default class questionScreen extends Component{


  constructor(props){
    super(props);

    this.state = {
      surveyId:'-Ls5cR9NAPPIpSuRVrke',
      questions: [],
    };

  }

  // componentDidMount(){
  //   this._isMounted = true;
  //   var sId = this.state.surveyId;
  //   var qArray = [];
  //   function loadData(sId){	
  //     console.log(sId)
	// 		return firebase.database().ref(`/surveys/`+sId+`/questions`).once("value");
	// 	};
  //   async function ListsUpdate(sId) {
	// 		await loadData(sId).then((snapshot) => {
	// 			var array = JSON.parse(JSON.stringify(snapshot));
	// 			for (ID in array){
	// 				qArray.push(array[ID]);
	// 			}
  //       console.log(qArray);
  //       this.setState({questions: qArray});
  //       console.log(this.state.questions);
  //     });
  //   }
  //   ListsUpdate(sId);
  // }
  

  render() {
      return (
        <View style={{flex:1, flexDirection:'column', backgroundColor:themeColor}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Question 1</Text>
          </View> 
          <View style={[styles.progressBar,{flex:1}]}>
            <ProgressBar/>
          </View>
          <View style={[styles.body,{flex:7}]}>
            <Mcq/>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity style={styles.touchable}>
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
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.touchtext}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}



