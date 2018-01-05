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
  ScrollView } from 'react-native';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';
import {
  Tile       ,
  List       ,
  ListItem } from 'react-native-elements';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store  from './../../store.js';
import Rest   from './../../rest.js';

import { me } from './meComponent/data.js'

/* ====================================================
      FUNCTION
      ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Me extends Reflux.Component {
  handleSettingsPress = () => {
    //this.props.navigation.navigate('Settings');
    Alert.alert("Settings works");
  };

  render(){
    //this.handleTemperature();
    return(
      <View style={styles.accueil}>
        <ScrollView>
          <Tile
            imageSrc={{ uri: this.props.picture.large}}
            featured
            title={`${this.props.name.first.toUpperCase()} ${this.props.name.last.toUpperCase()}`}
            caption={this.props.email}
          />

          <Button
            title="Settings"
            buttonStyle={{ marginTop: 20 }}
            onPress={this.handleSettingsPress}
          />

          <List>
            <ListItem
              title="Email"
              rightTitle={this.props.email}
              hideChevron
            />
            <ListItem
              title="Phone"
              rightTitle={this.props.phone}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Username"
              rightTitle={this.props.login.username}
              hideChevron
            />
          </List>

          <List>
            <ListItem
              title="Birthday"
              rightTitle={this.props.dob}
              hideChevron
            />
            <ListItem
              title="City"
              rightTitle={this.props.location.city}
              hideChevron
            />
          </List>
        </ScrollView>
      </View>
    );
  };
};

Me.defaultProps = { ...me };

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
