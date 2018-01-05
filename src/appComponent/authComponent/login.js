/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import Reflux   from 'reflux';
import CheckBox from 'react-native-checkbox';
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
    this.state = {
      pseudo: '',
      password: '',
      stayConnected: false
    };

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
        <View style={{height: 50, width: width(90), backgroundColor: 'powderblue'}}>
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
            checked={this.stayConnected}
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

/* ====================================================
      STYLES
      ====================================================== */
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 12,
  },
  idPage: {
    width: width(90),
    backgroundColor: 'skyblue',
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
    backgroundColor: 'skyblue',
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
