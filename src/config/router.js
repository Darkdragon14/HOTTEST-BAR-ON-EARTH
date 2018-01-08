/* ====================================================
      REACT
      ====================================================== */
import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

/* ====================================================
     JSX FILE
     ====================================================== */
import Accueil    from './../appComponent/homeComponent/accueil.js';
import Liste      from './../appComponent/homeComponent/liste.js';
import Historique from './../appComponent/homeComponent/historique.js';
import Me         from './../appComponent/homeComponent/me.js';
import BarDetail  from './../appComponent/homeComponent/listeComponent/barDetail.js';

/* ====================================================
      CODE
      ====================================================== */
export const ListeStack = StackNavigator({
  Liste: {
    screen: Liste,
    navigationOptions: {
      title: 'Liste',
    },
  },
  Details: {
    screen: BarDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.title.toUpperCase()}`,
    }),
  },
});

export const Tabs = TabNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />,
    }
  },
  Liste: {
    screen: ListeStack,
    navigationOptions: {
      tabBarLabel: 'Liste soirée',
      tabBarIcon:({ tintColor }) => <Icon name="explore" size={35} color={tintColor} />,
    }
  },
  Historique: {
    screen: Historique,
    navigationOptions: {
      tabBarLabel: 'Historique',
      tabBarIcon:({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  /*Settings: {
    screen: SettingsStack,
  },*/
}, {
  mode: 'modal',
  headerMode: 'none',
});
