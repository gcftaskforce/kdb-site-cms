/* global window document */

'use strict';

module.exports = () => {
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
};
