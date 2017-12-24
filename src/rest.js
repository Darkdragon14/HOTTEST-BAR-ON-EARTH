/* ====================================================
      REACT
      ====================================================== */
import RestClient from 'react-native-rest-client';

export default class YourRestApi extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('http://192.168.1.67');
  }

  // Now you can write your own methods easily
  login (username, password, stayConnected) {
    // Returns a Promise with the response.
    return this.POST('/login/', { username, password, stayConnected });
  }

  register (username, password){
    return this.POST('/register/', { username, password });
  }

  registerGet (){
    return this.GET('/register/')
      .then(response => response.token);
  }

  getTemperature () {
    // If the request is successful, you can return the expected object
    // instead of the whole response.
    return this.GET('/updateData/')
      .then(response => response.moyenne);
  }
};
