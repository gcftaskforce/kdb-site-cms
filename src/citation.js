/* global document */

const appendButton = require('./lib/append-button');
const API = require('./lib/API');
const parseForm = require('./lib/parse-form');
const clearModal = require('./lib/clear-modal');
const reloadLocation = require('./lib/reload-location');
const displayModal = require('./lib/display-modal');
const processError = require('./lib/process-error');

const modal = require('./modals/citation.ejs');

let api;

const onModalSave = () => {
  const { data, submission } = parseForm();
  clearModal();
  api.post('updateCitation', { id: data.id }, submission)
    .then(() => {
      reloadLocation();
    })
    .catch((err) => {
      processError(err);
    });
};

const onClick = (evt) => {
  const target = evt.currentTarget;
  const id = target.getAttribute('data-id') || '';
  api.post('get', { id })
    .then((rec) => {
      displayModal(modal, { rec }, onModalSave);
    })
    .catch((err) => {
      processError(err);
    });
};

module.exports = {
  render: (props) => {
    api = new API(props.API_ENDPOINT);

    /**
     * Inject the buttons
    */

    Array.prototype.slice.call(document.querySelectorAll('.cms-enabled .datum-editable.datum-cited') || []).forEach((ele) => {
      const id = ele.getAttribute('data-id');
      appendButton(ele, {
        className: 'fas fa-sm fa-asterisk',
        onClick,
        data: {
          id,
        },
      });
    });
  },
};
