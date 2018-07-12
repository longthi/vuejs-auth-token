import {
  storage
} from './session.js';

class Auth {
  constructor({
    webStore = 'session',
    authName = 'signIn',
    tokenName = 'token',
  }) {
    storage.webStore = webStore;
    this.authName = authName;
    this.tokenName = tokenName;
    this.data = {
      signIn: false,
      token: '',
    }
  }

  login(token = '') {
    if (token !== '') {
      this.data = {
        [this.authName]: true,
        [this.tokenName]: token,
      }
      storage.save(this.data);
    }
    return this._checkLogin();
  }

  signOut() {
    storage.remove(this.authName, this.tokenName);
    return this._checkLogin();
  }

  token() {
    return storage.get(this.tokenName);
  }

  check() {
    return this._checkLogin();
  }

  _checkLogin() {
    return storage.get(this.authName) || false;
  }

}

export default Auth;