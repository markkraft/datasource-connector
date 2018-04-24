import Request from './request';

/**
 * Send the xhr request to server
 *
 * @param {Request} obj Request object
 * @returns {Promise}
 */
export default class Http {

  constructor(controllerUrl) {
    this.controllerUrl = controllerUrl;
    this.listeners = [];
    this.defaultHeaders = {};
  }

  /**
     * make a callback function that listen for HTTP events
     *
     * @param {function} callback
     */
  addListener(callback) {
    if (typeof callback === 'function' || false) {
      this.listeners.push(callback);
    }
  }

  /**
     * this method emit the onDataSend event to listeners
     *
     * @param {any} args
     */
  onDataSend(...args) {
    if (this.listeners && this.listeners.length) {
      this.listeners.forEach((listener) => {
        setTimeout(() => { listener(...args); }, 5);
      });
    }
  }

  /**
   * make HTTP DELETE to url with payload data
   *
   * @param {string} url
   * @param {any} data
   */
  delete(url, data) {
    let request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'DELETE';
    request.body = JSON.stringify(data);

    return this.request(request).then(
      (value) => {
        this.onDataSend({ request, response: JSON.parse(value) });
        return JSON.parse(value);
      }
    );
  }

  /**
     * make HTTP PUT to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  put(url, data) {
    let request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'PUT';
    request.body = JSON.stringify(data);

    return this.request(request).then(
      (value) => {
        this.onDataSend({ request, response: JSON.parse(value) });
        return JSON.parse(value);
      }
    );
  }

  /**
     * make HTTP POST to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  post(url, data) {
    let request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'POST';
    request.body = JSON.stringify(data);

    return this.request(request).then(
      (value) => {
        this.onDataSend({ request, response: JSON.parse(value) });
        return JSON.parse(value);
      }
    );
  }

  /**
     * make HTTP GET call on url
     *
     * @param {string} url
     */
  get(url) {
    let request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;

    return this.request(request).then(
      (value) => {
        this.onDataSend({ request, response: JSON.parse(value) });
        return JSON.parse(value);
      }
    );
  }

  /**
    *
    * @param {object} obj
    */
  request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || 'GET', obj.url);
      if (obj.headers) {
        Object.keys(obj.headers).forEach((key) => {
          xhr.setRequestHeader(key, obj.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(obj.body);
    });
  };
}
