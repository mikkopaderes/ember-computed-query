import Ember from 'ember';

/**
 * Stub promise
 *
 * @param {boolean} willResolve True if will resolve. Otherwise, false.
 * @param {*} dataToReturn Data to return when `willResolve` is true.
 * @return {Promise} Promise resolving to `dataToReturn`
 */
export default function stubPromise(willResolve, dataToReturn) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    if (willResolve) {
      Ember.run(null, resolve, dataToReturn);
    } else {
      Ember.run(null, reject, dataToReturn);
    }
  });
}
