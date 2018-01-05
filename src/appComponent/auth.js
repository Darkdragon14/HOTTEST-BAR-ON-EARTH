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
  Button } from 'react-native';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';

/* ====================================================
     JSX FILE
     ====================================================== */
import Login    from './authComponent/login.js'
import Register from './authComponent/register.js'

import Store    from './../store.js';

/* ====================================================
      FUNCTION
      ====================================================== */
function Greeting(props){
  const checkPage = props.checkPage;
  if(checkPage){
    return(
      <View>
        <Login></Login>
        <View style={styles.button}>
          <View style={styles.myButton}>
            <Button
              onPress={props.onPressButton}
              title="Pas inscrit ?"/>
          </View>
        </View>
      </View>
    )
  } else {
    return(
      <View>
        <Register></Register>
        <View style={styles.button}>
          <View style={styles.myButton}>
            <Button
              onPress={props.onPressButton}
              title="Déjà enregistré ?"/>
          </View>
        </View>
      </View>
    )
  }
}
/* ====================================================
      CODE
      ====================================================== */
export default class Auth extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;

    // Fonction
    this.onPressButton = this.onPressButton.bind(this);
  };

  onPressButton(){
    if(this.state.checkPage){
      this.setState({checkPage: false});
    } else{
      this.setState({checkPage: true});
    }
  }

  render(){
    return(
      <View>
        <Greeting
          checkPage     = {this.state.checkPage}
          onPressButton = {this.onPressButton}
          onPressTest   = {this.onPressTest}
        />
      </View>
    );
  };
};

/* ====================================================
      STYLES
      ====================================================== */
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'powderblue',
  },
  myButton: {
    width: width(80),
    backgroundColor: 'powderblue',
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: width(3),
    marginBottom: width(3),
    justifyContent: 'center',
  }
})
