'use strict';

module.exports = ((stringArg) => {
  if (typeof stringArg !== 'string') return [];
  const string = stringArg.trim();
  if (!string.length) return [];
  return string.split(',');
});
