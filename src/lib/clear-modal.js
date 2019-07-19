/* global $ */

'use strict';

module.exports = () => {
  // hide any existing modal
  const existingModal = $('#modal');
  if (existingModal) {
    existingModal.modal('hide');
  }
};
