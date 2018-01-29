import Reflux  from 'reflux';
import Actions from './actions.js';
import { me }  from './appComponent/homeComponent/meComponent/data.js'


export default class Store extends Reflux.Store{
  constructor(){
    super();
    this.state = {
      check: false, // true : page home, false : page d'authentification
      checkPage: true, // true : page de login, false : page d'enregistrement

      // User
      pseudo: '',
      password: '',
      stayConnected: false,
      cookie: '',

      confirmPassword: '',
      email: '',
      confirmEmail: '',
      pro: false,

      nom: 'Yvert',
      prenom: '',
      birthdate: '',
      street: '',
      postcode: '',
      city: '',
      language: 'Français',

      // Bar information
      identification: '',
      name: 'Le mystère',
      addr: 'New York',
      horaire: 'lun-sam : 14h-3h',
      frequentation: '1000',
      description: 'Vous voulez savoir pourquoi le mystère ? C\'est ça le mystère ;)',
      evenement: '-50% sur les mojitos',

      temperature: '1',
      compteur: '0',
      sonorité: '',

      // liste page
      search: '',

      // variable test
      check: false,
      checkBeer: true,
      checkCocktail: true,
      checkRock: false,
      checkRap: false,
      checkHipHop: false,
      checkRaeggae: false,
      checkCalme: false,
      checkDanse: false,
      checkSport: false,
      checkGaming: false,
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
  onLogin(rep, cook){
    this.setState({
      //check: rep,
      //cookie: cook,
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

  onGetTemperature(rep){
    this.setState({
      temperature: rep,
    })
  }
}
