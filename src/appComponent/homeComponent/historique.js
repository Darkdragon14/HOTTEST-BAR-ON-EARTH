/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import Reflux               from 'reflux';
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

/* ====================================================
      CODE
      ====================================================== */
export default class Historique extends Reflux.Component {
  constructor(props){
      super(props);
      this.store = Store;
  }

  componentDidMount() {
    window.setInterval(function() {
      this.setState({temperature: this.state.temperature + 1})
    }.bind(this),60000);
  }

  render(){
    //this.handleTemperature();
    return(
      <View style={styles.accueil}>
        <View>
          <Text>Je suis dans l'historique</Text>
          <Text>{this.state.temperature}</Text>
        </View>
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
