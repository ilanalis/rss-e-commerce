import { it } from 'vitest';
import { hasNumbers } from '@utils/form-validation/';

/* Tested function is expected to return true */

it(`hasNumbers returns true when string contains
 one number`, ({ expect }) => {
  expect(hasNumbers('Test1test')).toBe(true);
});

it(`hasNumbers returns true when string contains
 more than one number`, ({ expect }) => {
  expect(hasNumbers('MixedCase123pPp**')).toBe(true);
});

it(`hasNumbers returns true when string contains only
 numbers`, ({ expect }) => {
  expect(hasNumbers('123456789 10')).toBe(true);
});

/* Tested function is expected to return false */

it(`hasNumbers returns false when string does not contain
 numbers`, ({ expect }) => {
  expect(hasNumbers('testWithoutNumbers')).toBe(false);
});

it('hasNumbers returns false when string is empty', ({ expect }) => {
  expect(hasNumbers('')).toBe(false);
});
