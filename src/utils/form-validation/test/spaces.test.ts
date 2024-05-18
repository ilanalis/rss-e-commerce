import { it, expect } from 'vitest';
import { hasSpaces } from '@utils/form-validation/';

const SPACES = [
  ' ',
  '\t', // Tab
  '\n', // Newline
  '\r', // Carriage return
  '\v', // Vertical tab
  '\f', // Form feed
  '\u00A0', // Non-breaking space
  '\u1680', // Ogham space mark
  '\u180E', // Mongolian vowel separator
  '\u2000', // En quad
  '\u2001', // Em quad
  '\u2002', // En space
  '\u2003', // Em space
  '\u2004', // Three-per-em space
  '\u2005', // Four-per-em space
  '\u2006', // Six-per-em space
  '\u2007', // Figure space
  '\u2008', // Punctuation space
  '\u2009', // Thin space
  '\u200A', // Hair space
  '\u2028', // Line separator
  '\u2029', // Paragraph separator
  '\u202F', // Narrow no-break space
  '\u205F', // Medium mathematical space
  '\u3000', // Ideographic space
];

/* Tested function is expected to return true */

it(`hasSpaces returns true when string contains
 one leading space`, () => {
  expect(hasSpaces(`${SPACES[0]}Test123`)).toBe(true);
});

it(`hasSpaces returns true when string contains
 more than one leading space`, () => {
  expect(hasSpaces(`${SPACES[1]} ${SPACES[2]} ${SPACES[3]} Test123`)).toBe(true);
});

it(`hasSpaces returns true when string contains
 one trailing space`, () => {
  expect(hasSpaces(`Test123${SPACES[4]}`)).toBe(true);
});

it(`hasSpaces returns true when string contains
 more than one trailing space`, () => {
  expect(hasSpaces(`Test123${SPACES[5]} ${SPACES[6]} ${SPACES[7]}`)).toBe(true);
});

it(`hasSpaces returns true when string contains
 leading and trailing spaces`, () => {
  expect(
    hasSpaces(
      `${SPACES[1]} ${SPACES[2]} ${SPACES[3]}Test123${SPACES[9]} ${SPACES[10]} ${SPACES[11]}`,
    ),
  ).toBe(true);
});

it(`hasSpaces returns true when string contains
 spaces inside the string`, () => {
  expect(hasSpaces('Te s t 123')).toBe(true);
});

it.each(SPACES)('hasSpaces(%s) -> true', (space) => {
  expect(hasSpaces(space)).toBe(true);
});

/* Tested function is expected to return false */

it(`hasSpaces returns true when string contains
 no leading, trailing spaces and spaces inside the string`, () => {
  expect(hasSpaces('Test123')).toBe(false);
});
