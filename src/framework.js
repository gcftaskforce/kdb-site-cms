/* global document */

const appendButton = require('./lib/append-button');
const appendTranslationBadge = require('./lib/append-translation-badge');
const API = require('./lib/API');
const parseForm = require('./lib/parse-form');
const displayModal = require('./lib/display-modal');

const editModal = require('./modals/framework.ejs');
const confirmModal = require('./modals/translate-confirm.ejs');
const reloadLocation = require('./lib/reload-location');
const findTimestamp = require('./lib/find-timestamp');
const formatTimestamp = require('./lib/format-timestamp');
const isGoogleTimestamp = require('./lib/is-google-timestamp');
const processError = require('./lib/process-error');

/**
 * module-level variables "instantiated" in exported render() function
 */

let api;

let LANG;
let SRC_LANGS;

const onModalSave = () => {
  const { data, submission } = parseForm();
  const params = {
    id: data.id,
    lang: LANG,
  };
  api.post('updateTranslation', params, submission)
    .then(() => {
      reloadLocation();
    })
    .catch((err) => {
      processError(err);
    });
};

const editOnClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  api.post('get', { id, lang: LANG })
    .then((rec) => {
      displayModal(editModal, { rec }, onModalSave);
    })
    .catch((err) => {
      processError(err);
    });
};

const translateOnClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  const fromLang = target.getAttribute('data-fromlang') || '';
  const toLang = target.getAttribute('data-tolang') || '';
  const propertyName = target.getAttribute('data-propertyname') || 'text';
  displayModal(confirmModal, { fromLang, toLang }, () => {
    const params = {
      propertyName,
      id,
      fromLang,
      toLang,
    };
    api.post('translate', params)
      .then(() => {
        reloadLocation();
      })
      .catch((err) => {
        processError(err);
      });
  });
};
module.exports = {
  render: (props) => {
    api = new API(props.API_ENDPOINT);
    ({ SRC_LANGS, LANG } = props);

    /**
     * Inject the buttons
    */

    Array.prototype.slice.call(document.querySelectorAll('.cms-enabled .datum-editable.datum-framework') || []).forEach((ele) => {
      const id = ele.getAttribute('data-id');
      const propertyName = ele.getAttribute('data-propertyname') || '';
      const timestamps = (ele.getAttribute('data-timestamps') || '').split(',');
      const timestamp = findTimestamp(timestamps, 'text', LANG);
      const isGoogleTranslation = isGoogleTimestamp(timestamp);
      SRC_LANGS.forEach((lang) => {
        appendButton(ele, {
          text: lang.toUpperCase(),
          title: `Replace with Google translation using ${lang.toLocaleUpperCase()} as the source`,
          onClick: translateOnClick,
          data: {
            id,
            fromlang: lang,
            tolang: LANG,
            propertyName,
          },
        });
      });
      appendTranslationBadge(ele, { isGoogleTranslation });
      appendButton(ele, {
        className: 'fas fa-sm fa-edit',
        title: formatTimestamp(timestamp),
        onClick: editOnClick,
        data: {
          id,
          propertyName,
        },
      });
    });
  },
};
