/* global $ document */

'use strict';

module.exports = (ele, props = {}) => {
  let markup = (props.items || []).map((item) => {
    return `<a class="dropdown-item" href="${item[1]}">${item[0]}</a>`;
  }).join('');
  markup = `<div class="dropdown-menu">${markup}</div>`;
  markup = `<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${props.text}</a>` + markup;
  const div = document.createElement('div');
  div.className = 'dropdown dropdown-link';
  div.innerHTML = markup;

  // console.log(markup);
  const appendToSelector = props.selector || '.heading-datum';
  // const icon = document.createElement('i');
  // icon.className = props.className || '';
  const heading = ele.querySelector(appendToSelector);
  if (heading && heading.firstChild) heading.insertBefore(div, heading.firstChild);
  else ele.appendChild(div);
};

/**
 * <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarLanguageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">EN</a>
    <div class="dropdown-menu" aria-labelledby="navbarLanguageDropdown">
          <a class="dropdown-item" href="/es/Partnerships/brazil.amapa">ES</a>
          <a class="dropdown-item" href="/fr/Partnerships/brazil.amapa">FR</a>
          <a class="dropdown-item" href="/id/Partnerships/brazil.amapa">ID</a>
          <a class="dropdown-item" href="/pt/Partnerships/brazil.amapa">PT</a>
    </div>
  </li>
 */