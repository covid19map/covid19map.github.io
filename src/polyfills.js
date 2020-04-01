import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/features/object/from-entries';
import 'core-js/features/array/includes';

if(!Object.fromEntries) {
  Object.fromEntries = function(iterable) {
    const result = {};
    for(const [key, value] of iterable) {
      let coercedKey;
      if(typeof key === 'string' || typeof key === 'symbol') {
        coercedKey = key;
      } else {
        coercedKey = String(key);
      }
      Object.defineProperty(result, coercedKey, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    return result;
  }
}
