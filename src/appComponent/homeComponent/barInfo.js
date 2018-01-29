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
  FormValidationMessage } from 'react-native-elements';
import DatePicker   from 'react-native-datepicker'
import SimplePicker from 'react-native-simple-picker';

/* ====================================================
     JSX FILE
     ====================================================== */
import Store   from './../../store.js';
import Actions from './../../actions.js';
import { me }  from './meComponent/data.js'

/* ====================================================
      FUNCTION
      ====================================================== */
const options = ['Français', 'Anglais', 'Allemand'];

/* ====================================================
      CODE
      ====================================================== */
export default class BarInfo extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }

  // componentDidMount() {
  //   return fetch('https://localhost/getBar/?id=' + this.state.identification)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       /* récupérer les variables qui seront enregistré dans le JSON */
  //       //this.setState({temperature: responseJson.temperature})
  //     })
  //     .catch(error => {console.error(error);});
  // }

  updateBar(){
    return fetch('https://localhost/updateBar/?id=' + this.state.cookie +
        '&nom=' + this.state.name +
        '&adresse' + this.state.addr +
        '&horaire' + this.state.horaire +
        '&frequentation' + this.state.frequentation +
        '&description' + this.state.description +
        '&enevenement' + this.state.evenemenent, {
      method: 'POST', // or 'PUT'
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: {
      //   nom: this.state.name,
      //   adresse: this.state.addr,
      //   horaire: this.state.horaire,
      //   frequentation: this.state.frequentation,
      //   description: this.state.description,
      //   evenement: this.state.evenemenent,
      // }
    })
    .then(response => response.json())
    .then(responseJson => {
/*
      AlertIOS.alert('Réponse : ' + responseJson.token +
        '\n Cookie : ' + cook +
        '\n id: ' + this.state.pseudo +
        '\n password: ' + this.state.password +
        '\n stayConnected: ' + this.state.stayConnected
      );
*/
      /* récupérer les variables qui seront enregistré dans le JSON */
      //this.setState({temperature: responseJson.temperature})
    })
    .catch(error => {console.error(error);});
  }

  render(){
    return(
      <View style={styles.accueil}>
        <ScrollView>
          <List>
            <FormLabel>Nom</FormLabel>
            <FormInput
              onChangeText={(nomBar) => this.setState({name: nomBar})}
              value={this.state.name}>
            </FormInput>

            <FormLabel>Adresse</FormLabel>
            <FormInput
              onChangeText={(adresse) => this.setState({addr: adresse})}
              value={this.state.addr}>
            </FormInput>

            <FormLabel>Les horaires</FormLabel>
            <FormInput
              onChangeText={(heure) => this.setState({horaire: heure})}
              value={this.state.horaire}>
            </FormInput>

            <FormLabel>Fréquentation maximal</FormLabel>
            <FormInput
              onChangeText={(max) => this.setState({frequentation: max})}
              value={this.state.frequentation}>
            </FormInput>

            <FormLabel>Description</FormLabel>
            <FormInput
              onChangeText={(desc) => this.setState({description: desc})}
              value={this.state.description}>
            </FormInput>

            <FormLabel>Évènement actuel</FormLabel>
            <FormInput
              onChangeText={(event) => this.setState({evenement: event})}
              value={this.state.evenement}>
            </FormInput>
          </List>

          <Button
            large
            icon={{name: 'cached'}}
            title='METTRE À JOUR'
            onPress={Actions.updateBar}
            buttonStyle={styles.updateButton}>
          </Button>
        </ScrollView>
      </View>
    );
  };
};

//BarInfo.defaultProps = { ...me };

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
