import test from 'node:test';
import assert from 'node:assert/strict';

import validate from '@replace-placeholder/validation';
import factory from '../src/check.js';

import RULES from '../src/rules.json' with { type: 'json' };

const check = factory({ validate, rules: RULES });

const validParams = {
  message: 'Hello {name}',
  params: { name: 'Andrii' },
  prefix: '{',
  suffix: '}',
};

test('returns valid true when all parameters are valid', () => {
  assert.deepEqual(check(validParams), {
    valid: true,
  });
});

test('returns invalid result when message is not a string', () => {
  assert.deepEqual(
    check({ ...validParams, message: 123 }),
    {
      valid: false,
      parameter: 'message',
      receivedType: 'number',
    },
  );
});

test('returns invalid result when params is not an object', () => {
  assert.deepEqual(
    check({ ...validParams, params: 'invalid' }),
    {
      valid: false,
      parameter: 'params',
      receivedType: 'string',
    },
  );
});

test('returns invalid result when params is null', () => {
  assert.deepEqual(
    check({ ...validParams, params: null }),
    {
      valid: false,
      parameter: 'params',
      receivedType: 'null',
    },
  );
});

test('returns invalid result when prefix is not a string', () => {
  assert.deepEqual(
    check({ ...validParams, prefix: 123 }),
    {
      valid: false,
      parameter: 'prefix',
      receivedType: 'number',
    },
  );
});

test('returns invalid result when prefix is empty', () => {
  assert.deepEqual(
    check({ ...validParams, prefix: '' }),
    {
      valid: false,
      parameter: 'prefix',
      receivedType: 'string',
    },
  );
});

test('returns invalid result when suffix is not a string', () => {
  assert.deepEqual(
    check({ ...validParams, suffix: 123 }),
    {
      valid: false,
      parameter: 'suffix',
      receivedType: 'number',
    },
  );
});

test('returns invalid result when suffix is empty', () => {
  assert.deepEqual(
    check({ ...validParams, suffix: '' }),
    {
      valid: false,
      parameter: 'suffix',
      receivedType: 'string',
    },
  );
});

test('returns the first validation error', () => {
  assert.deepEqual(
    check({
      ...validParams,
      message: 123,
      params: null,
    }),
    {
      valid: false,
      parameter: 'message',
      receivedType: 'number',
    },
  );
});

test('returns array as received type when validation fails', () => {
  const checkArray = factory({
    validate: () => false,
    rules: {
      params: { type: 'object' },
    },
  });

  assert.deepEqual(
    checkArray({ params: [] }),
    {
      valid: false,
      parameter: 'params',
      receivedType: 'array',
    },
  );
});