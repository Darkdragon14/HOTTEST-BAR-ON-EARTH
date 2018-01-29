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
  Button     ,
  StatusBar } from 'react-native';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';
import { Header } from 'react-native-elements';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store from './../store.js';

import { Tabs, Root } from './../config/router.js'

/* ====================================================
      FUNCTION
      ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Home extends Reflux.Component {
  render(){
    //this.handleTemperature();
    return (
      <View style={styles.vue}>
        <StatusBar
          barStyle="light-content">
        </StatusBar>
        <Root/>
      </View>
    );
  };
};

/* ====================================================
      STYLES
      ====================================================== */
const styles = StyleSheet.create({
  vue: {
    width: width(100),
    height: height(100),
    //marginTop: height(3),
  }
})

/*<Header
  centerComponent={{ text: 'Night Advisor', style: { color: '#fff' } }}
  backgroundColor={'midnightblue'}
/>*/
