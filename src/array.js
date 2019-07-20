/* global document */

const appendButton = require('./lib/append-button');
const API = require('./lib/API');
const parseForm = require('./lib/parse-form');
const displayModal = require('./lib/display-modal');
const clearModal = require('./lib/clear-modal');
const reloadLocation = require('./lib/reload-location');
const formatTimestamp = require('./lib/format-timestamp');
const processError = require('./lib/process-error');

const modal = require('./modals/array.ejs');

let api;

const onModalSave = () => {
  const { data, submission } = parseForm();
  clearModal();
  api.post('updateEntity', { id: data.id }, submission)
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

    Array.prototype.slice.call(document.querySelectorAll('.cms-enabled .datum-editable.datum-array') || []).forEach((ele) => {
      const id = ele.getAttribute('data-id');
      const timestamp = ele.getAttribute('data-timestamp') || '';
      appendButton(ele, {
        className: 'fas fa-sm fa-edit',
        title: formatTimestamp(timestamp),
        onClick,
        data: {
          id,
        },
      });
    });
  },
};
