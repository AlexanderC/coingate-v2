const axios = require('axios');
const { URL } = require('url');
const path = require('path');
const Config = require('./config');
const RequestFailedError = require('./error/request-failed');
const api = require('./api');

class Coingate {
  /**
   * @param {*} config 
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Injects API methods from config
   * @param {*} metadata 
   */
  injectApiMethods(metadata) {
    for (let name of Object.keys(metadata)) {
      this[name] = async (...args) => {
        const { method, entity, data, params, transform } = await metadata[name](...args);

        let result = await this.request(method, entity, data, params);
        
        if (transform && typeof transform === 'function') {
          result = await transform(result);
        }

        return result;
      };
    }

    return this;
  }

  /**
   * Make a request to API
   * @param {string} method 
   * @param {string} entity
   * @param {*} data 
   * @param {*} params
   */
  async request(method, entity, data, params) {
    let response = null;
    const { apiUrl, apiBase } = this.config;
    const { headers } = this;
    const url = new URL(path.join(apiBase, entity), apiUrl).toString();
    
    try {
      response = await axios.request({
        method, headers, data, params, url,
      });
    } catch (error) {
      throw new RequestFailedError(url, error);
    }

    // If non 2xx response
    if (response.status.toString().indexOf(2) !== 0) {
      throw new RequestFailedError(url, response);
    }

    return response.data;
  }

  /**
   * Build request headers
   */
  get headers() {
    return { ...Coingate.STATIC_HEADERS, ...this.authHeaders };
  }

  /**
   * Authorization headers
   */
  get authHeaders() {
    return { 'Authorization': `Token ${ this.config.token }` };
  }
  
  /**
   * Create Coingate client
   */
  static create({ token, mode = Config.LIVE }) {
    const { config } = new Config({ token, mode });
    const client = new this(config);

    return client.injectApiMethods(api);
  }

  /**
   * Statis headers
   */
  static get STATIC_HEADERS() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }
}

module.exports = Coingate;
