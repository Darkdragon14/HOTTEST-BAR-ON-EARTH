/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
//import Greeting            from './Greeting.js'
import Auth   from './appComponent/auth.js'
import Home   from './appComponent/home.js'
import Store  from './store.js';

/* ====================================================
      JS LIBRARIE
      ====================================================== */


/* ====================================================
      FUNCTION
      ====================================================== */
/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/
/*
class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}
*/

function Greeting(props){
  const check = props.check;
  if(check){
    return(
      <View>
        <Home></Home>
      </View>
    )
  } else {
    return (
      <View>
        <Auth></Auth>
      </View>
    )
  }
}


/* ====================================================
      CODE
      ====================================================== */
export default class App extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }

  render() {
    return (
      <View style={styles.container}>
        <Greeting
          check = {this.state.check}
        ></Greeting>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
