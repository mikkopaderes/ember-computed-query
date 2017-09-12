import { next } from '@ember/runloop';
import RSVP from 'rsvp';

/**
 * Stub promise
 *
 * @param {boolean} willResolve True if will resolve. Otherwise, false.
 * @param {*} dataToReturn Data to return when `willResolve` is true.
 * @return {Promise} Promise resolving to `dataToReturn`
 */
export default function stubPromise(willResolve, dataToReturn) {
  return new RSVP.Promise((resolve, reject) => {
    if (willResolve) {
      next(null, resolve, dataToReturn);
    } else {
      next(null, reject, dataToReturn);
    }
  });
}
