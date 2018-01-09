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
  ScrollView ,
  Picker     , } from 'react-native';
import {
  width      ,
  height     ,
  totalSize  , } from 'react-native-dimension';
import {
  Tile       ,
  List       ,
  ListItem   ,
  FormLabel  ,
  FormInput  ,
  Button     ,
  FormValidationMessage,
  Rating 
  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import SimplePicker from 'react-native-simple-picker';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store   from './../../store.js';
import Rest    from './../../rest.js';
import Actions from './../../actions.js';

import { me } from './meComponent/data.js'
import { bar } from './listeComponent/dataBar.js';
/* ====================================================
      FUNCTION
      ====================================================== */
const options = ['Français', 'Anglais', 'Allemand'];

/* ====================================================
      CODE
      ====================================================== */
export default class Me extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }
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
            featured
            title={`${bar.name}`}
            caption={this.props.email}
          />

          <List>
            <FormLabel>Nom</FormLabel>
            <FormInput
              onChangeText={(nom) => this.setState({nom})}
              value={this.props.name.last}>
            </FormInput>

            <FormLabel>Prénom</FormLabel>
            <FormInput
              onChangeText={(prenom) => this.setState({prenom})}
              value={this.props.name.first}>
            </FormInput>

            <FormLabel>Email</FormLabel>
            <FormInput
              value={this.props.email}>
            </FormInput>

           

            <FormLabel>Adresse</FormLabel>
            <FormInput
              onChangeText={(street) => this.setState({street})}
              value={this.props.location.street}>
            </FormInput>

            <FormLabel>Code postal</FormLabel>
            <FormInput
              onChangeText={(postcode) => this.setState({postcode})}
              value={this.props.location.postcode}>
            </FormInput>

            <FormLabel>Ville</FormLabel>
            <FormInput
              onChangeText={(city) => this.setState({city})}
              value={this.props.location.city}>
            </FormInput>

           
          </List>

          <Button
            large
            icon={{name: 'cached'}}
            title='METTRE À JOUR'
            onPress={Actions.updateMe}
            buttonStyle={styles.updateButton}>
          </Button>
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
  },
  updateButton: {
    width: width(90),
    marginTop: height(2),
    marginBottom: height(20),
    backgroundColor: 'midnightblue',
  },
  picker: {
    color: 'grey',
    width: width(90),
    marginTop: 15,
    marginLeft: width(5),
    marginBottom: 10,
    fontSize: 16,
  }
})
