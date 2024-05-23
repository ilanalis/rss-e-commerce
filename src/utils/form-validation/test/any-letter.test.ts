import { it } from 'vitest';
import { hasAnyLetter } from '@utils/form-validation/';

/* Tested function is expected to return true */

it(`hasAnyLetter returns true when string contains
 one capital letter`, ({ expect }) => {
  expect(hasAnyLetter('Test123')).toBe(true);
});

it(`hasAnyLetter returns true when string contains
 one small letter`, ({ expect }) => {
  expect(hasAnyLetter('TeST123&&T')).toBe(true);
});

it(`hasAnyLetter returns true when string contains
 more than one capital letter and no small letters`, ({ expect }) => {
  expect(hasAnyLetter('TEST__5ABC')).toBe(true);
});

it(`hasAnyLetter returns true when string contains
 no capital letters and more than one small letter`, ({ expect }) => {
  expect(hasAnyLetter('test__5abc')).toBe(true);
});

it(`hasAnyLetter returns true when string contains
 more than one capital and small letters`, ({ expect }) => {
  expect(hasAnyLetter('Hello 277*_1@#%  99\n\r\t3 WORLD')).toBe(true);
});

it(`hasAnyLetter returns true when string contains
 more than one capital and small letters`, ({ expect }) => {
  expect(hasAnyLetter('MixedCase123pPp')).toBe(true);
});

/* Tested function is expected to return false */

it(`hasAnyLetter returns true when string contains
 no capital and small letters`, ({ expect }) => {
  expect(hasAnyLetter('277*_1@#%  99\n\r\t3')).toBe(false);
});

it('hasAnyLetter returns false when string is empty', ({ expect }) => {
  expect(hasAnyLetter('')).toBe(false);
});
