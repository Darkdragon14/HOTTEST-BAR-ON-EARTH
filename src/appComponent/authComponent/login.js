/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import Reflux   from 'reflux';
import CheckBox from 'react-native-checkbox';
//import { CheckBox } from 'react-native-elements';
import {
  Alert      ,
  Platform   ,
  StyleSheet ,
  Text       ,
  View       ,
  AppRegistry,
  Image      ,
  TextInput  ,
  Button } from 'react-native';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';

/* ====================================================
     JSX FILE
     ====================================================== */
import Rest    from './../../rest.js';
import Actions from './../../actions.js';
import Store   from './../../store.js';

/* ====================================================
     FUNCTION
     ====================================================== */


/* ====================================================
     CODE
     ====================================================== */
export default class Login extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;

    this.postLogin = this.postLogin.bind(this);
  };

  postLogin(){
    /*const api = new Rest();
    var rep;
    api.login(this.state.pseudo, this.state.password, this.state.stayConnected)
      .then(response => rep = response.token);   // Successfully logged in
    console.log(rep);
    Actions.login(rep)*/
    Actions.login(); // change seulement la valeur check à true
  }


  render(){
    return(
      <View>
        <View style={ styles.home }>
          <Text style={styles.welcome}>Night Advisor</Text>
        </View>
        <View style={styles.idPage}>
          <TextInput
            style={styles.input}
            placeholder="Pseudo"
            onChangeText={(text) => this.setState({text})}/>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => this.setState({text})}
            secureTextEntry={true}/>
          <CheckBox
            label='Rester Connecté'
            containerStyle={styles.containerCheckbox}
            checked={this.state.stayConnected}
            onChange={(checked) => this.setState({stayConnected: !checked})}
          />
          <View style={styles.myButton}>
            <Button
              onPress={this.postLogin}
              title="Se connecter"/>
          </View>
        </View>
      </View>
    );
  };
};

/*
<CheckBox
  title='Rester Connecté'
  containerStyle={styles.containerCheckbox}
  checked={this.state.stayConnected}
  onPress={(checked) => this.setState({stayConnected: !checked})}
/>*/

/* ====================================================
      STYLES
      ====================================================== */
const styles = StyleSheet.create({
  home: {
    height: 50,
    width: width(90),
    backgroundColor: 'midnightblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 12,
    color: 'white'
  },
  idPage: {
    width: width(90),
    backgroundColor: 'powderblue',
  },
  input: {
    width: width(80),
    height: height(7),
    backgroundColor: 'white',
    padding: width(2),
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: width(3),
  },
  containerCheckbox: {
    backgroundColor: 'powderblue',
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: width(3),
  },
  myButton: {
    width: width(80),
    height: height(7),
    backgroundColor: 'white',
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: width(3),
    justifyContent: 'center',
  }
})
