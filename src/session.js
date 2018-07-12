let webStore = 'session';

const storage = {
  webStore,

  save(data) {
    for (let [key, value] of Object.entries(data)) {
      if (this.webStore === 'session') {
        sessionStorage.setItem(key, value);
      } else if (this.webStore === 'local') {
        localStorage.setItem(key, value);
      }
    }
    return Object.keys(data);
  },

  get(key) {
    if (this.webStore === 'session') {
      return sessionStorage.getItem(key);
    } else if (this.webStore === 'local') {
      return localStorage.getItem(key);
    }
  },

  remove(...keys) {
    for (let key of keys) {
      if (this.webStore === 'session') {
        sessionStorage.removeItem(key);
      } else if (this.webStore === 'local') {
        localStorage.removeItem(key);
      }
    }
  },

}

export {
  storage
};