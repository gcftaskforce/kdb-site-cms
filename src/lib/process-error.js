'use strict';

const displayAlert = require('./display-alert');

module.exports = (err) => {
  let message = err.message || '';
  if (message) message = `The server responded with: ${message}.`;
  if (err.status === 400) {
    displayAlert(`CHANGES NOT SAVED! The data you entered could not be accepted. ${message}`);
  } else if (err.status === 401) {
    displayAlert('CHANGES NOT SAVED! It looks like your edit session has expired. Try logging in again using the login link.');
  } else if (err.status === 500) {
    displayAlert('There was an error processing your request');
  } else {
    displayAlert(`There was an unexpected error. "${message}"`);
  }
};
