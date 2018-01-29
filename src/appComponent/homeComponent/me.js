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
export default class Me extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }

  // componentDidMount() {
  //   return fetch('https://localhost/userProfile/?cookie=' + this.state.cookie)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       /* récupérer les variables qui seront enregistré dans le JSON */
  //       //this.setState({temperature: responseJson.temperature})
  //     })
  //     .catch(error => {console.error(error);});
  // }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  updateProfile(){
    return fetch('https://localhost/updateProfile/?cookie=' + this.state.cookie +
        '&nom=' + this.state.nom +
        '&prenom' + this.state.prenom +
        '&datenaissance' + this.state.birthdate +
        '&adresse' + this.state.street +
        '&postcode' + this.state.postcode +
        '&city' + this.state.city +
        '&language' + this.state.language, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
      Actions.updateMe(responseJson.token);
    })
    .catch(error => {console.error(error);});
  }

  render(){
    return(
      <View style={styles.accueil}>
        <ScrollView>
          <Tile
            imageSrc={{ uri: this.props.picture.large}}
            featured
            title={`${this.props.name.first.toUpperCase()} ${this.props.name.last.toUpperCase()}`}
            caption={this.props.email}
            height={200}
          />

          <Button
            title="Settings"
            buttonStyle={{ marginTop: 20 }}
            onPress={this.handleSettingsPress}
          />

          <List>
            <FormLabel>Nom</FormLabel>
            <FormInput
              onChangeText={(nom) => this.setState({nom})}
              value={this.state.nom}>
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

            <FormLabel>Date de naissance</FormLabel>
            <DatePicker
              style={{width: width(90)}}
              date={this.state.birthdate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1940-01-01"
              maxDate="2018-01-30"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: width(5)
                },
                dateInput: {
                  marginLeft: width(15)
                }
              }}
              onDateChange={(date) => {this.setState({birthdate: date})}}
            />

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

            <FormLabel>Langue</FormLabel>
            <Text
              style={ styles.picker }
              onPress={() => {this.refs.picker.show();}}>
              {this.state.language}
            </Text>
            <SimplePicker
              ref={'picker'}
              options={options}
              onSubmit={(option) => {
                this.setState({
                  language: option,
                });
              }}
            />
          </List>

          <Button
            large
            icon={{name: 'cached'}}
            title='METTRE À JOUR'
            onPress={this.updateProfile}
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
