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
import Login    from './authComponent/login.js'
import Register from './authComponent/register.js'
import Store  from './../store.js';

/* ====================================================
      JS LIBRARIE
      ====================================================== */


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

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: 'skyblue',
  },
  myButton: {
    width: width(80),
    backgroundColor: 'white',
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: width(3),
    marginBottom: width(3),
    justifyContent: 'center',
  }
})
