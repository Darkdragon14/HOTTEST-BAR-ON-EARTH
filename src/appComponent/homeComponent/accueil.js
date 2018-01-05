/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import Reflux from 'reflux';
import {
  Alert      ,
  Platform   ,
  StyleSheet ,
  Text       ,
  View       ,
  AppRegistry,
  Image      ,
  TextInput  ,
  Button} from 'react-native';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store from './../../store.js';
import Rest  from './../../rest.js';


/* ====================================================
      JS LIBRARIE
      ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Accueil extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;

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
      <View style={styles.accueil}>
        <Text>Je suis dans l'accueil</Text>
        <Text>{this.state.temperature}</Text>
      </View>
    );
  };
};

/* ====================================================
      STYLES
      ====================================================== */
const styles = StyleSheet.create({
  accueil: {
    width: width(100),
    height: height(100),
    backgroundColor: '#F5FCFF',
  }
})
