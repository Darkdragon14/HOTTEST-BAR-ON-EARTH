/* ====================================================
      REACT
      ====================================================== */
import React          from 'react';
import {render}       from 'react-dom';

/* ====================================================
      JSX FILE FOR INDEX
      ====================================================== */
import identification from './indexComponent/identification.jsx';

/* ====================================================
      JS LIBRARIE
      ====================================================== */


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // Page d'authentification
      pseudo:        '',
      check:         false,
      errorLog:      false,
      errorRegister: false,
    }

    // Fonction de la page d'authentification
    this.handleLogin         = this.handleLogin.bind(this);
    this.handleRegister      = this.handleRegister.bind(this);
    this.handleCheckLogin    = this.handleCheckLogin.bind(this);
    this.handleCheckRegister = this.handleCheckRegister.bind(this);

    /* ====================================================
          IDENTIFICATION'S FUNCTIONS
          ====================================================== */
    handleLogin(){

    }

    // ...
  }
  render () {
    return <p> Hello React!</p>;
  }
}

render(<App/>, document.getElementById('app'));
