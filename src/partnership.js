/* global window document */

const appendButton = require('./lib/append-button');
const appendIcon = require('./lib/append-icon');
const appendDropdown = require('./lib/append-dropdown');
const API = require('./lib/API');
const parseForm = require('./lib/parse-form');
const displayModal = require('./lib/display-modal');
const findTimestamp = require('./lib/find-timestamp');
const formatTimestamp = require('./lib/format-timestamp');
const isGoogleTimestamp = require('./lib/is-google-timestamp');
const reloadLocation = require('./lib/reload-location');
// modals and forms
const stringModal = require('./modals/string.ejs');
const confirmModal = require('./modals/translate-confirm.ejs');
const jurisdictionListModal = require('./modals/partnership-jurisdiction-list.ejs');
const deleteConfirmModal = require('./modals/partnership-delete-confirm.ejs');
const partnershipAddForm = require('./forms/partnership-add.ejs');

/**
 * module-level variables "instantiated" in exported render() function
 */

let LANGS;
let SRC_LANGS;
let REGION_ID;
let LANG;
let api;

// // subheader contains the current region ID in a data attribute
// const REGION_ID = (document.getElementById('subheader-regional'))
//   ? document.getElementById('subheader-regional').getAttribute('data-regionid') || ''
//   : '';

const onModalSaveJurisdictions = () => {
  const { data, submission } = parseForm();
  api.post('updateEntityProperty', { id: data.id }, submission)
    .then((responseData) => {
      // console.log(responseData);
      reloadLocation();
    });
};

const onModalSaveString = (apiRouteName) => {
  const { data, submission } = parseForm();
  api.post(apiRouteName, { id: data.id, lang: LANG }, submission)
    .then((responseData) => {
      reloadLocation();
    });
};

/**
 * Inject buttons for deleting partnership
*/

const deleteOnClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  api.post('get', { id, lang: LANG })
    .then((rec) => {
      displayModal(deleteConfirmModal, { rec }, () => {
        api.post('delete', { id })
          .then((responseData) => {
            reloadLocation();
          });
      });
    });
};

const jurisdictionEditOnClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  api.post('get', { id, lang: LANG })
    .then((rec) => {
      displayModal(jurisdictionListModal, { rec }, onModalSaveJurisdictions);
    });
};

const stringEditOnClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  const propertyName = target.getAttribute('data-propertyname') || '';
  const lang = target.getAttribute('data-lang') || '';
  const isTranslatable = Boolean(lang); // only translatable fields include a lang attribute

  const apiRouteName = (isTranslatable) ? 'updateTranslation' : 'updateEntityProperty';
  api.post('get', { id, lang: LANG })
    .then((rec) => {
      displayModal(stringModal, { rec, propertyName }, onModalSaveString.bind(null, apiRouteName));
    });
};

const translateOnClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  const fromLang = target.getAttribute('data-fromlang') || '';
  const toLang = target.getAttribute('data-tolang') || '';
  const propertyName = target.getAttribute('data-propertyname') || '';
  displayModal(confirmModal, { fromLang, toLang }, () => {
    const params = {
      propertyName,
      id,
      fromLang,
      toLang,
      type: 'string',
    };
    api.post('translate', params)
      .then(() => {
        reloadLocation(id);
      });
  });
};

module.exports = {
  render: (props) => {
    api = new API(props.API_ENDPOINT);
    ({ LANGS, SRC_LANGS, LANG, REGION_ID } = props);

    /**
     * Process each partnership on the page
    */

    Array.prototype.slice.call(document.querySelectorAll('.cms-enabled .partnership-container') || []).forEach((containerEle) => {
      const id = containerEle.getAttribute('id');
      const timestamps = (containerEle.getAttribute('data-timestamps') || '').split(','); // "timestamps" array for this partnership
      const dropdownItems = [];
      LANGS.forEach((lang) => {
        if (lang === LANG) return;
        dropdownItems.push([lang.toUpperCase(), `/${lang}/Partnerships/${REGION_ID}/?scrollTo=${id}`]);
      });
      appendDropdown(containerEle, {
        selector: '.box-heading',
        text: LANG.toUpperCase(),
        items: dropdownItems,
      });
      // inject delete button
      appendButton(containerEle, {
        className: 'fas fa-sm fa-times-circle',
        selector: '.box-heading',
        onClick: deleteOnClick,
        data: {
          id,
        },
      });

      /**
       * Inject buttons for editing strings
      */

      Array.prototype.slice.call(containerEle.querySelectorAll('.datum-string') || []).forEach((ele) => {
        const eleLang = ele.getAttribute('data-lang') || '';
        const isTranslatable = Boolean(eleLang); // only translatable strings will have a lang attribute
        const propertyName = ele.getAttribute('data-propertyname');
        // timestamp "find" parameters depend on whether or not the field is translatable
        const timestamp = (isTranslatable) ? findTimestamp(timestamps, propertyName, LANG) : findTimestamp(timestamps, propertyName);
        const isGoogleTranslation = isGoogleTimestamp(timestamp);
        // show translate buttons only for translatable content
        if (ele.classList.contains('datum-translatable')) {
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
        }
        if (isTranslatable) {
          appendIcon(ele, {
            className: (isGoogleTranslation) ? 'fab fa-sm fa-google' : 'fas fa-sm fa-arrows-alt-h',
          });
        }
        appendButton(ele, {
          className: 'fas fa-sm fa-edit',
          onClick: stringEditOnClick,
          title: formatTimestamp(timestamp),
          data: { id, lang: eleLang, propertyName },
        });
      });

      /**
       * Inject button for editing member jurisdictions
      */

      const jurisdictionListEle = containerEle.querySelector('.datum-partnership-jurisdictions');
      if (jurisdictionListEle) {
        const timestamp = findTimestamp(timestamps, 'jurisdictions');
        appendButton(jurisdictionListEle, {
          className: 'fas fa-sm fa-edit',
          onClick: jurisdictionEditOnClick,
          title: formatTimestamp(timestamp),
          data: { id },
        });
      }
    });


    const partnershipsContainer = document.querySelector('.cms-enabled .partnerships');

    /**
     * Inject form for adding partnership
    */

    if (partnershipsContainer) {
      partnershipsContainer.insertAdjacentHTML('afterbegin', partnershipAddForm({ regionId: REGION_ID }));

      const addOnClick = () => {
        let name = '';
        const inputEle = document.getElementById('property-partnership-name');
        if (inputEle) name = inputEle.value || '';
        if (!name) return; // don't submit a blank name TODO: issue a warning
        const params = {
          modelName: 'partnership',
          regionId: REGION_ID,
          lang: LANG,
        };
        const submission = { name };
        api.post('insert', params, submission)
          .then((responseData) => {
            reloadLocation(responseData.id);
          });
      };
      document.getElementById('partnership-add').addEventListener('click', addOnClick);

      /**
       * Check for "scroll"
      */

      if (window.location.search) {
        const params = {};
        window.location.search.substring(1).split('&').forEach((paramString) => {
          const [key, value] = paramString.split('=');
          params[key] = value;
        });
        if (params.scrollTo) {
          const ele = document.getElementById(params.scrollTo);
          if (ele) {
            ele.scrollIntoView();
            // clear the search params
            let href = window.location.origin;
            if (window.location.pathname) href += window.location.pathname;
            window.history.replaceState({ id: params.scrollTo }, '', href);
          }
        }
      }
    }
  },
};
