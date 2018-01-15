/* ====================================================
      REACT
      ====================================================== */
import React, { Component } from 'react';
import {
  ScrollView,
  View      , } from 'react-native';
import {
  Tile    ,
  List    ,
  ListItem,
  Rating  ,
  Text    ,
  Icon    ,
  Button  , } from 'react-native-elements';
import {
  width      ,
  height     ,
  totalSize } from 'react-native-dimension';

  /* ====================================================
        FUNCTION
        ====================================================== */
function Greeting(props){
  const checkWifi         = props.checkWifi;
  const checkAccesibilite = props.checkAccesibilite;
  const checkMusique      = props.checkMusique;
  if(checkWifi && checkAccesibilite){
    return(
      <View style={{flexDirection: 'column', flex: 1, marginRight: 5}}>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='wifi' size={30}/>
          <Text style={{textAlign: 'center'}}>Wifi</Text>
        </View>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='accessible' size={30}/>
          <Text style={{textAlign: 'center'}}>Accesibilité</Text>
        </View>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='ios-musical-notes' type='ionicon' size={30}/>
          <Text style={{textAlign: 'center'}}>{checkMusique}</Text>
        </View>
      </View>
    )
  }
  else if (checkWifi && !checkAccesibilite){
    return(
      <View style={{flexDirection: 'column', flex: 1, marginRight: 5}}>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='wifi' size={35}/>
          <Text style={{textAlign: 'center'}}>Wifi</Text>
        </View>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='ios-musical-notes' type='ionicon' size={35}/>
          <Text style={{textAlign: 'center'}}>{checkMusique}</Text>
        </View>
      </View>
    )
  }
  else if (!checkWifi && checkAccesibilite){
    return(
      <View style={{flexDirection: 'column', flex: 1, marginRight: 5}}>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='accessible' size={35}/>
          <Text style={{textAlign: 'center'}}>Accesibilité</Text>
        </View>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='ios-musical-notes' type='ionicon' size={35}/>
          <Text style={{textAlign: 'center'}}>{checkMusique}</Text>
        </View>
      </View>
    )
  }
  else if (!checkWifi && !checkAccesibilite){
    return(
      <View style={{flexDirection: 'column', flex: 1, marginRight: 5}}>
        <View style={{flexDirection: 'column', flex: 1, justifyContent:'center'}}>
          <Icon name='ios-musical-notes' type='ionicon' size={40}/>
          <Text style={{textAlign: 'center'}}>{checkMusique}</Text>
        </View>
      </View>
    )
  }
}
export default class Bar extends Component {
  onEvenement = (bar) => {
    this.props.navigation.navigate('Evenement', {...bar});
  }

  render() {
    const {
      picture,
      name,
      email,
      phone,
      location,
      ambiance,
      temperature,
      frequentation,
      moyenneAvis,
      horaire,
      infoComp } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: picture.large}}
          featured
          title={`${name.title.toUpperCase()}`}
          height={200}
        />
        <View style= {{flexDirection: 'row', backgroundColor: 'white'}}>
          <Text style={{flex:1.9, fontSize: 24, fontWeight: 'bold', paddingVertical: 5, marginLeft: 5}}>{name.title.toUpperCase()}</Text>
          <Rating
            showrating
            type="star"
            fractions={1}
            startingValue={moyenneAvis}
            readonly
            imageSize={25}
            onFinishRating={this.ratingCompleted}
            style={{flex: 1, paddingVertical: 5 }}
          />
        </View>

        <View style={{height:200, flexDirection: 'row', backgroundColor: '#D9D9D9'}}>
          <View style={{flex: 4, flexDirection: 'column', justifyContent:'center'}}>
            <View style={{flex:2, marginLeft: 5}}>
              <Text>Ambiance : {ambiance}</Text>
              <Text>Fréquentation : {frequentation}</Text>
              <Text>Température : {temperature}</Text>
            </View>
            <View style={{flex:1, marginLeft: 5, justifyContent:'center'}}>
              <Text>Adresse : </Text>
              <Text>{location.street}, {location.postcode} {location.city}</Text>
            </View>
            <View style={{flex:1, marginLeft: 5, justifyContent:'center'}}>
              <Text>Horaire : </Text>
              <Text>{horaire}</Text>
            </View>
          </View>
          <View style={{flex:1.2}}>
            <Greeting
              checkWifi         = {infoComp.wifi}
              checkAccesibilite = {infoComp.accesibilite}
              checkMusique      = {infoComp.musique}
              >
            </Greeting>
          </View>
        </View>
        <Button
          title='Évènement'
          onPress={() => this.onEvement(bar)}
        />
      </ScrollView>
    );
  }
}
