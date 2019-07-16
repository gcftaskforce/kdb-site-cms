/* global document */
/* eslint-env shared-node-browser */
/* eslint no-console: 0, no-restricted-globals: 0 */

'use strict';

const deserializeArray = require('./src/lib/deserialize-array');

const citation = require('./src/citation');
const contact = require('./src/contact');
const value = require('./src/value');
const array = require('./src/array');
const text = require('./src/text');
const framework = require('./src/framework');
const partnership = require('./src/partnership');

// the variables LANG and SRC_LANGS are derived from HTML tag properties (as follows)
const SRC_LANGS = deserializeArray(document.querySelector('body').getAttribute('data-src-langs')); // all supported langs (serialized array)
const LANG = document.querySelector('html').getAttribute('lang') || 'en'; // currently selected lang

module.exports = {
  render: (apiEndpoint) => {
    citation.render(apiEndpoint, SRC_LANGS, LANG);
    contact.render(apiEndpoint, SRC_LANGS, LANG);
    value.render(apiEndpoint, SRC_LANGS, LANG);
    array.render(apiEndpoint, SRC_LANGS, LANG);
    text.render(apiEndpoint, SRC_LANGS, LANG);
    framework.render(apiEndpoint, SRC_LANGS, LANG);
    partnership.render(apiEndpoint, SRC_LANGS, LANG);
  },
};
