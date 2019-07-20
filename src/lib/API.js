/* global fetch */

'use strict';

const FETCH_OPTIONS = {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
};

module.exports = class API {
  constructor(apiEndpoint) {
    this.API_ENDPOINT = apiEndpoint;
  }

  post(methodName, params, submission) {
    let query = '';
    if (params) {
      const querySlugs = [];
      Object.entries(params).forEach(([name, value]) => {
        if (!value) return;
        querySlugs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
      });
      if (querySlugs.length) query = `?${querySlugs.join('&')}`;
    }
    const options = Object.assign({ headers: { 'Content-Type': 'application/json' } }, FETCH_OPTIONS);
    if (submission) options.body = JSON.stringify(submission);
    const uri = `${this.API_ENDPOINT}/${methodName}${query}`;
    return fetch(uri, options)
      .then((res) => {
        if (!res.ok) return Promise.reject(new Error(res.status)); // the caller will need to "catch" this
        // check for JSON content
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) return res.json(); // <-- this is a promise!
        return {};
      });
  }
};
