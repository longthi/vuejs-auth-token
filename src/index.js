import Auth from './auth.js';

export default {
  install(Vue, options = {}) {
    const auth = new Auth(options);

    Vue.auth = auth;

    Vue.prototype.$auth = auth;
  }
}