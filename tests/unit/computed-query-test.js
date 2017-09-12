import { module, test } from 'qunit';
import EmberObject from '@ember/object';
import wait from 'ember-test-helpers/wait';

import sinon from 'sinon';

import { query, queryRecord } from 'ember-computed-query';
import stubPromise from 'dummy/tests/helpers/stub-promise';

module('Unit | computed query');

test('should return a computed promise array when calling query with an object as options', function(assert) {
  assert.expect(2);

  // Arrange
  const queryResult = [{
    id: 'foo',
    value: 'bar',
  }, {
    id: 'bar',
    value: 'foo',
  }];

  const queryStub = sinon.stub().returns(stubPromise(true, queryResult));

  const EO = EmberObject.extend({
    store: { query: queryStub },

    foo: query('model', { foo: 'bar' }),
  });

  const object = EO.create();

  // Act
  const promiseArray = object.get('foo');

  // Assert
  return wait().then(() => {
    const result = promiseArray.get('content');

    assert.ok(queryStub.calledWithExactly('model', { foo: 'bar' }));
    assert.deepEqual(result, queryResult);
  });
});

test('should return a computed promise array when calling query with a function as options', function(assert) {
  assert.expect(2);

  // Arrange
  const queryResult = [{
    id: 'foo',
    value: 'bar',
  }, {
    id: 'bar',
    value: 'foo',
  }];

  const queryStub = sinon.stub().returns(stubPromise(true, queryResult));

  const EO = EmberObject.extend({
    store: { query: queryStub },
    id: 'foobar_id',

    foo: query('model', (context) => {
      return { foo: context.get('id') };
    }),
  });

  const object = EO.create();

  // Act
  const promiseArray = object.get('foo');

  // Assert
  return wait().then(() => {
    const result = promiseArray.get('content');

    assert.ok(queryStub.calledWithExactly('model', { foo: 'foobar_id' }));
    assert.deepEqual(result, queryResult);
  });
});

test('should return a computed promise object when calling query with an object as options', function(assert) {
  assert.expect(2);

  // Arrange
  const queryRecordResult = { id: 'foo', value: 'bar' };

  const queryRecordStub = sinon.stub().returns(
    stubPromise(true, queryRecordResult),
  );

  const EO = EmberObject.extend({
    store: { queryRecord: queryRecordStub },

    foo: queryRecord('model', { foo: 'bar' }),
  });

  const object = EO.create();

  // Act
  const promiseObject = object.get('foo');

  // Assert
  return wait().then(() => {
    const result = promiseObject.get('content');

    assert.ok(queryRecordStub.calledWithExactly('model', { foo: 'bar' }));
    assert.deepEqual(result, queryRecordResult);
  });
});

test('should return a computed promise object when calling query with an object as options', function(assert) {
  assert.expect(2);

  // Arrange
  const queryRecordResult = { id: 'foo', value: 'bar' };

  const queryRecordStub = sinon.stub().returns(
    stubPromise(true, queryRecordResult),
  );

  const EO = EmberObject.extend({
    store: { queryRecord: queryRecordStub },
    id: 'foobar_id',

    foo: queryRecord('model', (context) => {
      return { foo: context.get('id') };
    }),
  });

  const object = EO.create();

  // Act
  const promiseObject = object.get('foo');

  // Assert
  return wait().then(() => {
    const result = promiseObject.get('content');

    assert.ok(queryRecordStub.calledWithExactly('model', { foo: 'foobar_id' }));
    assert.deepEqual(result, queryRecordResult);
  });
});
