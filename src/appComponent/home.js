/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import {Alert, Platform, StyleSheet, Text, View, AppRegistry, Image, TextInput, Button} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import Reflux from 'reflux';

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
export default class Home extends Reflux.Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: 1,
      compteur: 0,
    };

    //this.getTemperature = this.getTemperature.bind(this);
  };


  componentDidMount() {
    window.setInterval(function() {
      this.setState({temperature: this.state.temperature + 1})
      /*
      return fetch('https://192.168.1.67/register/')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({temperature: this.state.temperature})
          //this.setState({temperature: responseJson.temperature})
          // return responseJson.temperature;
        })
        .catch(error => {console.error(error);});
    */}.bind(this),5000);
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
