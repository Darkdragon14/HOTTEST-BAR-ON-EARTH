/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import {Alert, Platform, StyleSheet, Text, View, AppRegistry, Image, TextInput, Button} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';

/* ====================================================
     JSX FILE FOR INDEX
     ====================================================== */
//import Accueil from './homeComponent/accueil.js'
//import Profile from './homeComponent/profile.js'
import Store from './../store.js';
import Rest  from './../rest.js';



/* ====================================================
      JS LIBRARIE
      ====================================================== */


/* ====================================================
      FUNCTION
      ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: '23',
      compteur: 0,
    };

    this.handleTemperature = this.handleTemperature.bind(this);
  };

  handleTemperature(){
    const api = new Rest();
    var rep;
    api.getTemperature()
      .then(response => rep = response.moyenne);   // Successfully logged in
    Alert.alert('moyenne : ' + rep);
    this.setState({
      temperature: rep,
    });
  }

  render(){
    //this.handleTemperature();
    return(
      <View>
        <Text>Hello Jonathan, you are connected to the app</Text>
        <Text>{this.state.temperature}</Text>
      </View>
    );
  };
};
