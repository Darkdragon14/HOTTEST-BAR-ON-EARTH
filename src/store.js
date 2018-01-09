import Reflux from 'reflux';

import Actions from './actions.js';
import { me } from './appComponent/homeComponent/meComponent/data.js'


export default class Store extends Reflux.Store{
  constructor(){
    super();
    this.state = {
      check: false, // true : page home, false : page d'authentification
      checkPage: true, // true : page de login, false : page d'enregistrement

      // Login and Register page
      pseudo: '',
      password: '',
      stayConnected: false,

      confirmPassword: '',
      email: '',
      confirmEmail: '',
      pro: '',

      // Accueil page
      temperature: 1,
      compteur: 0,
      abc: '',

      // Me page
      nom: 'Yvert',
      prenom: '',
      birthdate: '',
      street: '',
      city: '',
      postcode: '',
      language: 'Français',

      // liste page
      search: '',


      // variable test
      check: false,
    }

    // Very important to use the files actions.js
    this.listenables = Actions;
  }

/* ====================================================
    FUNCTION IN STORE.JS (bind the fonction)
    ====================================================== */


/* ====================================================
    FUNCTION WITH ACTIONS.JS
    ====================================================== */
  onLogin(){
    this.setState({
      check: true,
    })
  }

  onRegister(rep){
    this.setState({
      check: rep,
    })
  }

  onUpdateMe(){
    this.setState({
      update: true,
    })
  }

  /*onGetTemperature(rep){
    this.setState({
      temperature: rep,
    })
  }*/
}
