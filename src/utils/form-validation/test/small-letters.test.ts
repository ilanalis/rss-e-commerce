import { it } from 'vitest';
import { hasSmallLetters } from '@utils/form-validation/';

/* Tested function is expected to return true */

it(`hasSmallLetters returns true when string contains
 one small letter`, ({ expect }) => {
  expect(hasSmallLetters('Test123')).toBe(true);
});

it(`hasSmallLetters returns true when string contains
 more than one small letter`, ({ expect }) => {
  expect(hasSmallLetters('MixedCase123pPp**')).toBe(true);
});

it(`hasSmallLetters returns true when string contains only
 small letters`, ({ expect }) => {
  expect(hasSmallLetters('onlysmalls')).toBe(true);
});

/* Tested function is expected to return false */

it(`hasSmallLetters returns false when string does not contain
 small letters`, ({ expect }) => {
  expect(hasSmallLetters('TEST123')).toBe(false);
});

it('hasSmallLetters returns false when string is empty', ({ expect }) => {
  expect(hasSmallLetters('')).toBe(false);
});
