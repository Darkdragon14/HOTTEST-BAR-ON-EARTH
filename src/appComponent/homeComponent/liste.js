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
import { SearchBar } from 'react-native-elements'
import SimplePicker from 'react-native-simple-picker';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store from './../../store.js';
import Rest  from './../../rest.js';

/* ====================================================
      FUNCTION
      ====================================================== */
      const options = ['Option1', 'Option2', 'Option3'];


/* ====================================================
      CODE
      ====================================================== */
export default class Liste extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
    this.state = {
      selectedOption: '',
    };
  }

  render(){
    //this.handleTemperature();
    return(
      <View style={styles.accueil}>
        <SearchBar
          lightTheme
          onChangeText={this.state.search}
          onClearText={this.state.search}
          placeholder='Search Here...'>
        </SearchBar>
        
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
