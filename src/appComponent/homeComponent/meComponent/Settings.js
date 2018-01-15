import React, { Component } from 'react';
import Reflux               from 'reflux';
import CheckBox from 'react-native-checkbox';
import { ScrollView, StyleSheet }       from 'react-native';
import {
  List,
  ListItem,
  Text } from 'react-native-elements';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';

import Store from './../../../store.js';

export default class Settings extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = Store;
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
const styles = StyleSheet.create({
  containerCheckbox: {
    marginLeft: width(5),
    marginRight: width(5),
    marginTop: 5,
    marginBottom: 5,
  },
})
