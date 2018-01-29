/* ====================================================
      REACT
      ====================================================== */
import React, { Component }       from 'react';
import Reflux                     from 'reflux';
import CheckBox                   from 'react-native-checkbox';
import { ScrollView, StyleSheet } from 'react-native';
import {
  List,
  ListItem,
  Text,
  Button } from 'react-native-elements';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';

/* ====================================================
      JSX FILE
      ====================================================== */
import Store   from './../../../store.js';
import Actions from './../../../actions.js'

/* ====================================================
      CODE
      ====================================================== */
export default class Settings extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }

  savePreference(){
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
      /* récupérer les variables qui seront enregistré dans le JSON */
      //this.setState({temperature: responseJson.temperature})
    })
    .catch(error => {console.error(error);});
  }

  render() {
    return (
      <ScrollView>
        <List>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Boissons :</Text>
          <CheckBox
            label='Bières'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkBeer}
            onChange={(checked) => this.setState({checkBeer: !checked})}
          />
          <CheckBox
            label='Cocktails'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkCocktail}
            onChange={(checked) => this.setState({checkCocktail: !checked})}
          />
        </List>
        <List>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Musique :</Text>
          <CheckBox
            label='Rock'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkRock}
            onChange={(checked) => this.setState({checkRock: !checked})}
          />
          <CheckBox
            label='Raeggae'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkRaeggae}
            onChange={(checked) => this.setState({checkRaeggae: !checked})}
          />
          <CheckBox
            label='Hip-Hop'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkHipHop}
            onChange={(checked) => this.setState({checkHipHop: !checked})}
          />
          <CheckBox
            label='Rap'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkRap}
            onChange={(checked) => this.setState({checkRap: !checked})}
          />
        </List>
        <List>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Ambiance :</Text>
          <CheckBox
            label='Calme'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkCalme}
            onChange={(checked) => this.setState({checkCalme: !checked})}
          />
          <CheckBox
            label='Danse'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkDanse}
            onChange={(checked) => this.setState({checkDanse: !checked})}
          />
          <CheckBox
            label='Sport'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkSport}
            onChange={(checked) => this.setState({checkSport: !checked})}
          />
          <CheckBox
            label='Gaming'
            containerStyle={styles.containerCheckbox}
            checked={this.state.checkGaming}
            onChange={(checked) => this.setState({checkGaming: !checked})}
          />
        </List>

        <Button
          medium
          icon={{name: 'cached'}}
          title='Sauvegarder'
          onPress={this.savePreference}
          buttonStyle={styles.updateButton}>
        </Button>

        <List>
          <ListItem title="Password"/>
        </List>
        <List>
          <ListItem
            title="Sign Out"
            rightIcon={{ name: 'cancel' }}>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}

/* ====================================================
      STYLES
      ====================================================== */
const styles = StyleSheet.create({
  containerCheckbox: {
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: 5,
    marginBottom: 5,
  },
  updateButton: {
    width: width(90),
    marginTop: height(2),
    backgroundColor: 'midnightblue',
  },
})
