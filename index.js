/* eslint-env shared-node-browser */
/* eslint no-console: 0, no-restricted-globals: 0 */

'use strict';

const citation = require('./src/citation');
const contact = require('./src/contact');
const value = require('./src/value');
const array = require('./src/array');
const text = require('./src/text');
const framework = require('./src/framework');
const partnership = require('./src/partnership');

module.exports = {
  render: (apiEndpoint) => {
    citation.render(apiEndpoint);
    contact.render(apiEndpoint);
    value.render(apiEndpoint);
    array.render(apiEndpoint);
    text.render(apiEndpoint);
    framework.render(apiEndpoint);
    partnership.render(apiEndpoint);
  },
};
