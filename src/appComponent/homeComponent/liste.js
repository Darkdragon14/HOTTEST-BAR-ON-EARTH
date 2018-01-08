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
  ScrollView , } from 'react-native';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';
import {
  SearchBar,
  List     ,
  ListItem , } from 'react-native-elements'
import SimplePicker from 'react-native-simple-picker';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store from './../../store.js';
import Rest  from './../../rest.js';

import { bars } from './listeComponent/dataBar.js';

/* ====================================================
      FUNCTION
      ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Liste extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }

  onLearnMore = (bar) => {
    this.props.navigation.navigate('Details', { ...bar });
  };

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
        <ScrollView>
          <List>
            {bars.map((bar) => (
              <ListItem
                key={bar.login.username}
                roundAvatar
                avatar={{ uri: bar.picture.thumbnail }}
                title={`${bar.name.title.toUpperCase()}`}
                subtitle={bar.email}
                onPress={() => this.onLearnMore(bar)}
              />
            ))}
          </List>
        </ScrollView>
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
