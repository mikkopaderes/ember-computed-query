/** @module ember-computed-query */
import Ember from 'ember';

const {
  ArrayProxy,
  ObjectProxy,
  PromiseProxyMixin,
  computed,
} = Ember;

/**
 * Returns a promise that will resolve to the store's query method
 *
 * @param {string} modelName
 * @param {Object|Function} [options={}]
 * @return {Promise} Resolves to the query result
 */
export function query(modelName, options = {}) {
  return computed({
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
 * @return {Promise} Resolves to the queryRecord result
 */
export function queryRecord(modelName, options = {}) {
  return computed({
    get() {
      const query = typeof options === 'function' ? options(this) : options;
      const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

      return PromiseObject.create({
        promise: this.get('store').queryRecord(modelName, query),
      });
    },
  }).readOnly();
}