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
  render: (apiEndpoint, srcLangs, lang) => {
    citation.render(apiEndpoint, srcLangs, lang);
    contact.render(apiEndpoint, srcLangs, lang);
    value.render(apiEndpoint, srcLangs, lang);
    array.render(apiEndpoint, srcLangs, lang);
    text.render(apiEndpoint, srcLangs, lang);
    framework.render(apiEndpoint, srcLangs, lang);
    partnership.render(apiEndpoint, srcLangs, lang);
  },
};
