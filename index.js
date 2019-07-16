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
const LANGS = deserializeArray(document.querySelector('body').getAttribute('data-langs')); // all supported langs (serialized array)
const SRC_LANGS = deserializeArray(document.querySelector('body').getAttribute('data-src-langs')); // langs that can serve as a translation source (serialized array)
const REGION_ID = document.querySelector('body').getAttribute('data-regionid') || ''; // current region (e.g. brazil | mexico.campeche)
const LANG = document.querySelector('html').getAttribute('lang') || 'en'; // currently selected lang

module.exports = {
  render: (API_ENDPOINT) => {
    const props = {
      API_ENDPOINT, LANGS, SRC_LANGS, LANG, REGION_ID,
    };
    citation.render(props);
    contact.render(props);
    value.render(props);
    array.render(props);
    text.render(props);
    framework.render(props);
    partnership.render(props);
  },
};
