/* ====================================================
      REACT
      ====================================================== */
import React, { Component }       from 'react';
import {Alert, Platform, StyleSheet, Text, View, AppRegistry, Image, TextInput, Button} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import CheckBox                   from 'react-native-checkbox';
import Reflux                     from 'reflux';

/* ====================================================
     JSX FILE FOR INDEX
     ====================================================== */
import Rest                       from './../../rest.js';
import Actions                    from './../../actions.js';


/* ====================================================
     JS LIBRARIE
     ====================================================== */


/* ====================================================
     FUNCTION
     ====================================================== */


/* ====================================================
      CODE
      ====================================================== */
export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      pseudo: '',
      password: '',
      confirmPassword: '',
      email: '',
      confirmEmail: '',
      pro: ''
    };

    this.handleRegister = this.handleRegister.bind(this);
  };

  handleRegister(){
    const api = new Rest();
    var rep;
    api.register(this.state.pseudo, this.state.password)
      .then(response => rep = response.token);   // Successfully logged in
    Alert.alert('La réponse : ' + rep)
    Actions.register(rep)
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
            onChangeText={(pseudo) => this.setState({pseudo})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmation password"
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
          /><TextInput
            style={styles.input}
            placeholder="Confirmation email"
            onChangeText={(confirmEmail) => this.setState({confirmEmail})}
          />
          <CheckBox
            label='Compte professionnel'
            containerStyle={styles.containerCheckbox}
            checked={this.pro}
            onChange={(checked) => this.setState({pro: !checked})}
          />
          <View style={styles.myButton}>
            <Button
              onPress={this.handleRegister}
              title="S'enregistrer"/>
          </View>
        </View>
      </View>
    );
  };
};


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
    backgroundColor: 'white',
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: width(3),
    justifyContent: 'center',
  }
})
