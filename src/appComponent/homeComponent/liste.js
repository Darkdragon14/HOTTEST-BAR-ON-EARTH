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
import Store    from './../../store.js';
import { bars } from './listeComponent/dataBar.js';

/* ====================================================
      CODE
      ====================================================== */
export default class Liste extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
  }

  // componentDidMount() {
  //   return fetch('https://localhost/getBarList/')
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       /* récupérer les variables qui seront enregistré dans le JSON */
  //       //this.setState({temperature: responseJson.temperature})
  //     })
  //     .catch(error => {console.error(error);});
  // }

  onLearnMore = (bar) => {
    this.props.navigation.navigate('Details', { ...bar });
    // return fetch('https://localhost/temperature')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     Alert.alert('La réponse : ' + responseJson.temperature);
    //     Actions.getTemperature(responseJson.temperature);
    //     // return responseJson.token;
    //   })
    //   .catch(error => {console.error(error);});
  };

  render(){
    return(
      <View style={styles.accueil}>
        <SearchBar
          lightTheme
          onChangeText={this.state.search}
          onClearText={this.state.search}
          placeholder='Search Here...'>
        </SearchBar>
        <ScrollView style={{marginTop: -21}}>
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
