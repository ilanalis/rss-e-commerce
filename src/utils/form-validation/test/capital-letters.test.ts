import { it } from 'vitest';
import { hasCapitalLetters } from '@utils/form-validation/';

/* Tested function is expected to return true */

it(`hasCapitalLetters returns true when string contains
 one capital letter`, ({ expect }) => {
  expect(hasCapitalLetters('Test123')).toBe(true);
});

it(`hasCapitalLetters returns true when string contains
 more than one capital letter`, ({ expect }) => {
  expect(hasCapitalLetters('MixedCase123pPp')).toBe(true);
});

it(`hasCapitalLetters returns true when string contains only
 capital letters`, ({ expect }) => {
  expect(hasCapitalLetters('ONLYCAPITALS')).toBe(true);
});

/* Tested function is expected to return false */

it(`hasCapitalLetters returns false when string does not contain
 capital letters`, ({ expect }) => {
  expect(hasCapitalLetters('test123')).toBe(false);
});

it('hasCapitalLetters returns false when string is empty', ({ expect }) => {
  expect(hasCapitalLetters('')).toBe(false);
});
