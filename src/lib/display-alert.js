/* global window document */

'use strict';

const CONTAINING_ID = 'alert-area';

module.exports = (message) => {
  const containerEle = document.getElementById(CONTAINING_ID);
  if (!containerEle) return;
  // remove any existing alerts
  const existingAlert = containerEle.querySelector('.alert');
  if (existingAlert) existingAlert.remove();
  // display new alert
  const alertEle = document.createElement('div');
  alertEle.className = 'alert alert-warning';
  alertEle.setAttribute('role', 'alert');
  alertEle.innerText = message;
  containerEle.appendChild(alertEle);
  window.scroll(0, 0);
};
