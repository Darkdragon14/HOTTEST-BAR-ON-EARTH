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
//import pinch from 'react-native-pinch';
//import configureTrustKit from 'react-native-trustkit-wrapper';

/* ====================================================
     JSX FILE
     ====================================================== */
import Rest    from './../../rest.js';
import Actions from './../../actions.js';
import Store   from './../../store.js';

/* ====================================================
     FUNCTION
     ====================================================== */
/*configureTrustKit({
 PinnedDomain: {
   '172.20.10.3': {
     IncludeSubdomains: true,
     EnforcePinning: true,
     PublicKeyAlgorithms: [
       'AlgorithmRsa2048',
     ],
     PublicKeyHashes: [
       'HXXQgxueCIU5TTLHob/bPbwcKOKw6DkfsTWYHbxbqTY=',
       '0SDf3cRToyZJaMsoS17oF72VMavLxj/N7WBNasNuiR8=',
     ],
     ReportUris: [
       'https://172.20.10.3/log_report',
     ],
   },
 },
 SwizzleNetworkDelegates: true,
}).catch((err) => {
 if (err.code === 'trustkit_initialized') {
   console.warn('Trust kit configuration only changed when app re-launches');
 }
});*/

/* ====================================================
      CODE
      ====================================================== */
export default class Register extends Component {
  constructor(props){
    super(props);
    this.store = Store;

    this.getRegister = this.getRegister.bind(this);
  };


  // fonction pour récupérer avec GET {"token" : true}.... Doit faire un post par la suite
  getRegister(){
    /* FONCTIONNE AVEC LE SERVEUR DE ACHILLE */
    return fetch('https://192.168.43.193/register')
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert('La réponse : ' + responseJson.token);
        Actions.register(responseJson.token);
        // return responseJson.token;
      })
      .catch(error => {console.error(error);});
    /*
    pinch.fetch('https://172.20.10.3/register', {
      timeoutInterval: 10000, // timeout after 10 seconds
      sslPinning: {
        cert: 'NightAdvisor', // cert file name without the `.cer`
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      Alert.alert('La réponse : ' + responseJson.token);
      Actions.register(responseJson.token);
    })
    .catch(error => {console.error(error);});
    */
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
          />
          <TextInput
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
              onPress={this.getRegister}
              title="S'enregistrer"/>
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
