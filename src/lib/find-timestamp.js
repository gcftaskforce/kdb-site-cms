'use strict';

const SEPARATOR = '~';

module.exports = (timestampsArg, propertyNameArg, langArg) => {
  if (!Array.isArray(timestampsArg)) return '';
  if (!propertyNameArg) return '';
  const [propertyBaseName] = propertyNameArg.split('.');
  const requestedTimestamp = timestampsArg.find((t) => {
    const [, propertyName, lang] = t.split(SEPARATOR);
    if (propertyName !== propertyBaseName) return false;
    // if langArg was provided, test it also
    if (langArg) return (lang === langArg);
    return true;
  });
  return requestedTimestamp || '';
};
