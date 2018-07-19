import {
  storage
} from './session.js';

const TIME_OBJ = new Date();

export default class Auth {
  constructor({
    webStore = 'session',
    authName = 'signIn',
    tokenName = 'token',
    localAge = 0,
  }) {
    this.webStore = webStore;
    this.authName = authName;
    this.tokenName = tokenName;

    if (localAge !== 0) {
      this.localAge = localAge;
    } else {
      this.localAge = (webStore === 'local') ? -1 : 259200;
    }

    this.data = {};
  }

  login(token = '', webStore = this.webStore) {
    if (token !== '') {
      if (webStore === 'local') {
        this.data = {
          [this.authName]: true,
          [this.tokenName]: token,
          'localAge': this.localAge,
          'cTime': TIME_OBJ.getTime()
        }
      } else {
        this.data = {
          [this.authName]: true,
          [this.tokenName]: token,
        }
      }
      storage.save(this.data, webStore);
    }
    return this._checkLogin();
  }

  signOut() {
    storage.remove(this.authName, this.tokenName, 'localAge', 'cTime');
    return this._checkLogin();
  }

  token() {
    return storage.get(this.tokenName) || storage.get(this.tokenName, 'local');
  }

  check() {
    return this._checkLogin();
  }

  _checkLogin() {
    if (storage.get(this.authName, 'local')) {
      if (this._checkPassed()) {
        storage.remove(this.authName, this.tokenName, 'localAge', 'cTime');
        return false;
      } else {
        return true;
      }
    } else {
      return storage.get(this.authName, 'session') || false;
    }
  }

  _checkPassed() {
    let nTime = TIME_OBJ.getTime();
    let cTime = storage.get('cTime', 'local');
    if (nTime - cTime > this.localAge * 1000 && this.localAge != -1) {
      return true;
    } else {
      return false;
    }
  }

}

if (window.Vue) {
  window.Vue.use(Auth);
}