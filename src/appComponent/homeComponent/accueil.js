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
export default class Accueil extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  };

  // componentDidMount() {
  //   window.setInterval(function() {
  //     //this.setState({temperature: this.state.temperature + 1})
  //     return fetch('https://localhost/getDashboard/?cookie=' + this.state.cookie)
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         this.setState({temperature: this.state.temperature})
  //         //this.setState({temperature: responseJson.temperature})
  //       })
  //       .catch(error => {console.error(error);});
  //   }.bind(this),60000);
  // }

  render(){
    return(
      <View style={styles.accueil}>
        <Text>Je suis dans l'accueil</Text>
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
