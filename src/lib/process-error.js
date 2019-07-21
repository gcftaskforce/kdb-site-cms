'use strict';

const displayAlert = require('./display-alert');

module.exports = (err) => {
  if (err.status === 401) {
    displayAlert('It looks like your edit session has expired. Try logging in again using the login link.');
  } else if (err.status === 500) {
    displayAlert('There was an error processing your request');
  } else {
    displayAlert(`There was an unexpected error. The API responded with '${err.message}'`);
  }
};
