import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView,TextInput } from 'react-native';
import RadioForm,{RadioButton, RadioButtonInput, RadioButtonLable} from 'react-native-simple-radio-button';

const themeColor = '#4b0082';

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderRadius:15,
        marginBottom:5,
        height:'100%'
    },
    question:{
        height:'auto',
    },
    qtext:{
        padding: 20,
        fontWeight: 'bold',
        fontSize:30,
        marginVertical:10,
        color: '#00008b',
    },
    answer:{
        padding: 20,
        alignSelf: 'center',
        paddingLeft:15,
        flexWrap:'wrap',
        color: '#00008b',

    }

})

var answers = [
    {label:"Strongly Disagree", value:0},
    {label:"Disagree", value:1},
    {label:"Neutral view", value:2},
    {label:"Agree", value:3},
    {label:"Strongly Agree", value:3},
];


export default class Mcq extends Component{
    constructor(props){
        super(props)

        this.state= {
            questionType:"MCQ",

        }
    }

    render(){
    
        if(this.state.questionType=="MCQ"){
            return(
                <View style={styles.container}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={styles.qtext}>{this.props.data}</Text>   
                    </View>
                    <View style={styles.answer}>
                        <RadioForm
                            radio_props = {answers}
                            onPress = {(value)=>{}}
                            selectedButtonColor ={'purple'}
                            selectedLableColor = {'puple'}
                            labelStyle = {{fontSize:20, color: '#00008b'}}
                            initial = {-1}
                            buttonSize={20}
                        />
                    </View>
                </View>
                    );
        }else{
            return(
                <View>
                    <View>
                        <Text style={styles.text}>1. Is your work meaningful ?</Text> 
                    </View>
                    <View>
                        <TextInput
                            style={{ height:40, marginTop:15, borderColor: 'gray', borderWidth: 1 }}
                            />
                    </View>
                </View>
            );
        }
       
    }
}