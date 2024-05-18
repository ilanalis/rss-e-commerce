import { it, expect } from 'vitest';
import { hasSpecialCharacters } from '@utils/form-validation/';

const SPECIAL_CHARACTERS = '! @ # $ % ^ & * ( ) _ + - = [ ] { } ; \' : " \\ | , . < > / ?'.split(
  ' ',
);

/* Tested function is expected to return true */

it(`hasSpecialCharacters returns true when string contains
 one special character`, () => {
  expect(hasSpecialCharacters('Test123$')).toBe(true);
});

it.each(SPECIAL_CHARACTERS)('hasSpecialCharacters(%s) -> true', (specialCharacter) => {
  expect(hasSpecialCharacters(specialCharacter)).toBe(true);
});

it(`hasSpecialCharacters returns true when string contains
 more than one special character`, () => {
  expect(hasSpecialCharacters('MixedCase123pPp :) test `_` --->')).toBe(true);
});

it(`hasSpecialCharacters returns true when string contains only
 special characters`, ({ expect }) => {
  expect(hasSpecialCharacters(SPECIAL_CHARACTERS.join(' '))).toBe(true);
});

/* Tested function is expected to return false */

it(`hasSpecialCharacters returns false when string does not contain
 special characters`, ({ expect }) => {
  expect(hasSpecialCharacters('test123 no special Characters')).toBe(false);
});

it('hasSpecialCharacters returns false when string is empty', ({ expect }) => {
  expect(hasSpecialCharacters('')).toBe(false);
});
