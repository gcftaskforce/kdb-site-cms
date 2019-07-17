/* global document */

'use strict';

module.exports = (ele, props = {}) => {
  const isGoogleTranslation = Boolean(props.isGoogleTranslation);
  const appendToSelector = props.selector || '.heading-datum';
  const badge = document.createElement('span');
  badge.className = 'translation-badge';
  const span = document.createElement('span');
  span.innerText = (isGoogleTranslation) ? 'G' : 'T';
  badge.appendChild(span);
  const heading = ele.querySelector(appendToSelector);
  if (heading && heading.firstChild) heading.insertBefore(badge, heading.firstChild);
  else ele.appendChild(badge);
};
