const storage = {

  save(data, webStore) {
    for (let [key, value] of Object.entries(data)) {
      if (webStore === 'session') {
        sessionStorage.setItem(key, value);
      } else if (webStore === 'local') {
        localStorage.setItem(key, value);
      }
    }
    return Object.keys(data);
  },

  get(key, webStore = 'session') {
    if (webStore === 'session') {
      return sessionStorage.getItem(key);
    } else if (webStore === 'local') {
      return localStorage.getItem(key);
    }
  },

  remove(...keys) {
    for (let key of keys) {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    }
  },

}

export {
  storage
};