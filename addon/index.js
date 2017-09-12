import { computed } from '@ember/object';
import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

/**
 * Returns a promise that will resolve to the store's query method
 *
 * @param {string} modelName
 * @param {Object|Function} [options={}]
 * @param {...string} keys
 * @return {Promise} Resolves to the query result
 */
export function query(modelName, options = {}, ...keys) {
  return computed(...keys, {
    get() {
      const query = typeof options === 'function' ? options(this) : options;
      const PromiseArray = ArrayProxy.extend(PromiseProxyMixin);

      return PromiseArray.create({
        promise: this.get('store').query(modelName, query),
      });
    },
  }).readOnly();
}

/**
 * Returns a promise that will resolve to the store's queryRecord method
 *
 * @param {string} modelName
 * @param {Object|Function} [options={}]
 * @param {...string} keys
 * @return {Promise} Resolves to the queryRecord result
 */
export function queryRecord(modelName, options = {}, ...keys) {
  return computed(...keys, {
    get() {
      const query = typeof options === 'function' ? options(this) : options;
      const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

      return PromiseObject.create({
        promise: this.get('store').queryRecord(modelName, query),
      });
    },
  }).readOnly();
}
