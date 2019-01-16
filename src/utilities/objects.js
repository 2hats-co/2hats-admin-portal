import chain from 'ramda/es/chain';
import fromPairs from 'ramda/es/fromPairs';
import map from 'ramda/es/map';
import toPairs from 'ramda/es/toPairs';
import isNil from 'ramda/es/isNil';
import filter from 'ramda/es/filter';

export const flattenObj = obj => {
  const go = objX =>
    chain(([k, v]) => {
      if (typeof v === 'object') {
        return map(([kX, vX]) => [`${k}.${kX}`, vX], go(v));
      } else {
        return [[k, v]];
      }
    }, toPairs(objX));
  return fromPairs(go(obj));
};

export const flattenSearchHighlight = obj => {
  const go = objX =>
    chain(([k, v]) => {
      if (typeof v === 'object') {
        if (v.matchLevel !== 'none')
          return map(([kX, vX]) => [`${k}.${kX}`, vX], go(v));
        else return [[null, null]];
      } else {
        if (k.indexOf('value') > -1) return [[k, v]];
        else return [[null, null]];
      }
    }, toPairs(objX));

  const hasValue = field => {
    let value = true;
    field.forEach(v => {
      if (isNil(v)) value = false;
    });
    return value;
  };

  return filter(hasValue, go(obj));
};
