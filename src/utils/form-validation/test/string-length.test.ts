import { describe, it, expect } from 'vitest';
import { isStringLongEnough } from '@utils/form-validation/';

describe('Test Min Length of The String', () => {
  it.each([
    ['hello', 3, true],
    ['world', 5, true],
    ['', 0, true],
    ['hello', -1, true],
    ['', -5, true],
    ['hi', 5, false],
    ['', 1, false],
  ])('isStringLongEnough(%s, %d) -> %s', (str, minLength, expected) => {
    expect(isStringLongEnough(str, minLength)).toBe(expected);
  });
});
