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
      FUNCTION
      ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Liste extends Reflux.Component {
  render(){
    //this.handleTemperature();
    return(
      <View style={styles.accueil}>
        <Text>Je suis dans la liste</Text>
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
