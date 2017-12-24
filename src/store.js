import Reflux from 'reflux';

import Actions from './actions.js';

export default class Store extends Reflux.Store{
  constructor(){
    super();
    this.state = {
      check: false, // true : page home, false : page d'authentification
      checkPage: true, // true : page de login, false : page d'enregistrement
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

  /*onGetTemperature(rep){
    this.setState({
      temperature: rep,
    })
  }*/
}
