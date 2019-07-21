'use strict';

module.exports = (err) => {
  if (err.status === 401) {
    console.log('That\'s a 401');
  } else if (err.status === 500) {
    console.log('That\'s a 500');
  } else {
    console.log(err.message);
  }
};
