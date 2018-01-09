import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

export default class Bar extends Component {
  render() {
    const { picture, name, email, phone, location } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: picture.large}}
          featured
          title={`${name.title.toUpperCase()}`}
          caption={email}
        />

        <List>
          <ListItem
            title="Email"
            rightTitle={email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={phone}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Username"
            rightTitle={name.title}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="City"
            rightTitle={location.city}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}
