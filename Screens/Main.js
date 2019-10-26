import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Alert, Header, TouchableOpacity, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import LoadingView from './loading';
// import FirebaseComponents from './../Components/FireBase'


const themeColor = '#4b0082';


export default class MainScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { 
      currentUser: '',
      numPendingSurveys: 0,
      fSnapshot: null
      };
    // Firebase = new FirebaseComponents();
  };
  
  componentDidMount () {
    this._isMounted = true;
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${userId}/firstName`).on("value", snapshot => {
      if (this._isMounted) { 
      this.setState({currentUser: snapshot.val()});
      }
    });
  }

  getPendingSurveys = (userID)=> {
		var surveyList = [];
		var userSurveyList = [];
		var x=3;

		function loadData(){	
			return firebase.database().ref(`currentSurveyIDs/`).once("value");
		};

		function loaduserData(uID){
			return firebase.database().ref(`users/`+uID+`/answeredSurveys`).once("value");
		};

		async function ListsUpdate(uID) {
			await loadData().then((snapshot) => {
				var array = JSON.parse(JSON.stringify(snapshot));
				for (ID in array){
					surveyList.push(ID)
				};
			});
			await loaduserData(uID).then((snapshot) => {
				var array = JSON.parse(JSON.stringify(snapshot));
				for (ID in array){
					userSurveyList.push(ID)
				};
			});
			x = 5;
		}
		ListsUpdate(userID)
		return x;
	}

  Numquestions = () => {
    var numQ = this.state.numPendingSurveys;

    const DATA = [
      {
        'id': '1',
        'content': 'a'
      },
      {
        'id': '2',
        'content': 'b'
      }
    ]

    if (numQ){
      return(
        // console.log('here')
        <View style={{flex: 1, alignSelf: 'flex-start'}}>
          <Text style={{alignSelf: 'center'}}>You have {numQ} pending surveys.</Text>
          <View style={{padding:3}}></View>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <View style={styles.body}>
                <TouchableOpacity
                  style={styles.touchableload}
                  onPress={() => {
                    this.props.navigation.navigate('SurveyScreen')
                  }}
                  underlayColor='#4b0082'>
                  <Text style={styles.touchtext}>
                    Enter survey {item.id}
                  </Text>
                </TouchableOpacity>
                <View style={{padding:3}}></View>
              </View>
            )}
          />
        </View>

      )
    }
    else {
      return(
        <Text style={styles.text}>Refresh to load pending surveys</Text>
      )
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  logOut = () => {
    firebase.auth().signOut(),
    console.log('Logged out')
  }


  render(){
    if (this.state.currentUser == ''){
      return (
        <LoadingView/>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={{color:themeColor, fontSize: 25}}> 
            Hi, {this.state.currentUser}
          </Text>
          <View style={{padding: 20}}>

          </View>

          {this.Numquestions()}
          {/* <View style={{flex: 1, padding: 20, justifyContent: 'flex-end'}}>
            <TouchableHighlight
              style={styles.touchable}
              onPress={() => console.log(Firebase.writeSurvey())}
              underlayColor='#4b0082'>
              <Text style={styles.touchtext}>
                Enter Survey
              </Text>
            </TouchableHighlight>
          </View> */}

          <View style={{flex: 1, padding: 20, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.touchableload}
              onPress={() => {
                this.setState({numPendingSurveys: this.getPendingSurveys(firebase.auth().currentUser.uid)})
              }}
              underlayColor='#4b0082'>
              <Text style={styles.touchtext}>
                Refresh
              </Text>
            </TouchableOpacity>
            <View style={{padding:10}}></View>
            <TouchableHighlight
              style={styles.touchable}
              onPress={() => this.logOut()}
              underlayColor='#4b0082'>
              <Text style={styles.touchtext}>
                Sign Out
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
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
  },
  touchable: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    height: 40,
    width: 120,
    padding: 0,
    borderRadius: 25,
    backgroundColor: '#4b0082',
    borderColor: '#4b0082'
  },
  touchableload: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    height: 40,
    width: 380,
    padding: 0,
    borderRadius: 25,
    backgroundColor: '#00008b',
    borderColor: '#4b0082'
  },
  touchtext: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  nomalText: {
    padding: 0,
    fontWeight: 'bold',
    textAlign: 'left', 
    color: '#4b0082', 
    fontSize: 15
    },
  text: {
    padding: 0,
    textAlign: 'left', 
    color: '#000000', 
    fontSize: 18
    } 
});