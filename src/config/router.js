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
import Bar        from './../appComponent/homeComponent/barInfo.js'
import Settings   from './../appComponent/homeComponent/meComponent/settings.js';
import BarDetail  from './../appComponent/homeComponent/listeComponent/bar.js';
import Evenement from './../appComponent/homeComponent/listeComponent/barComponent/evenement.js';
import Avis from './../appComponent/homeComponent/listeComponent/barComponent/evenement.js';
import Soirees from './../appComponent/homeComponent/listeComponent/barComponent/soirees.js';

import Store from './../store.js';

/* ====================================================
      CODE
      ====================================================== */
export const AccueilStack = StackNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      title: 'Night Advisor',
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    },
  }
})

export const ListeStack = StackNavigator({
  Liste: {
    screen: Liste,
    navigationOptions: {
      title: 'Night Advisor',
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    },
  },
  Details: {
    screen: BarDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.title.toUpperCase()}`,
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    }),
  },
  Evenement: {
    screen: Evenement,
    navigationOptions: ({ navigation }) => ({
      title: 'Évènement',
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    }),
  }
});

export const HistoriqueStack = StackNavigator({
  Historique: {
    screen: Historique,
    navigationOptions: {
      title: 'Night Advisor',
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    }
  }
})

export const MeStack = StackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      title: 'Night Advisor',
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'blue',
      },
      headerTintColor: 'white',
    }
  }
})

export const BarStack = StackNavigator({
  Bar: {
    screen: Bar,
    navigationOptions: {
      title: 'Night Advisor',
      headerStyle: {
        backgroundColor: 'midnightblue',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: 'blue',
      },
      headerTintColor: 'white',
    }
  }
})

export const Tabs = TabNavigator({
  Accueil: {
    screen: AccueilStack,
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
    screen: HistoriqueStack,
    navigationOptions: {
      tabBarLabel: 'Historique',
      tabBarIcon:({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    }
  },
  Me: {
    screen: MeStack,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  Bar: {
    screen: BarStack,
    navigationOptions: {
      tabBarLabel: 'Bar',
      tabBarIcon: ({ tintColor }) => <Icon name="location-city" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
