import { describe, it, expect, vi } from 'vitest';
import { isPostalCode } from '@utils/form-validation/';

type TestCase = {
  postalCode: string;
  countryCode: string;
  expected: boolean;
};

const createTestCasesInput = (tests: TestCase[]) =>
  tests.map(
    ({ postalCode, countryCode, expected }): [...Parameters<typeof isPostalCode>, boolean] => [
      postalCode,
      countryCode,
      expected,
    ],
  );

describe('isPostalCode', () => {
  it('should return false for unknown country codes', () => {
    const postalCode = '12345';
    const countryCode = 'UNKNOWN';
    const result = isPostalCode(postalCode, countryCode);
    expect(result).toBe(false);
  });

  it('should return false and log an error for unknown country codes', () => {
    console.error = vi.fn();

    const postalCode = '12345';
    const countryCode = 'UNKNOWN';
    const result = isPostalCode(postalCode, countryCode);

    expect(console.error).toHaveBeenCalledWith('Got unknown country code: ', countryCode);
    expect(result).toBe(false);
  });
});

/* Properly tested postal codes: US, DE, NL */

describe('should validate postal codes correctly for known country codes', () => {
  const testCases = [
    { postalCode: 'SW1A 1AA', countryCode: 'GB', expected: true },
    { postalCode: 'GIR 0AA', countryCode: 'GB', expected: true },
    { postalCode: 'AB1 1AB', countryCode: 'GB', expected: true },
    { postalCode: 'BFPO 1234', countryCode: 'GB', expected: true },
    { postalCode: 'W1A 1AA', countryCode: 'GB', expected: true },
    { postalCode: 'JE1 1AA', countryCode: 'JE', expected: true },
    { postalCode: 'GY1 1AA', countryCode: 'GG', expected: true },
    { postalCode: 'IM1 1AA', countryCode: 'IM', expected: true },
    { postalCode: '90210', countryCode: 'US', expected: true },
    { postalCode: '90210 1234', countryCode: 'US', expected: true },
    { postalCode: '90210-1234', countryCode: 'US', expected: true },
    { postalCode: 'K1A 0B1', countryCode: 'CA', expected: true },
    { postalCode: 'K1A0B1', countryCode: 'CA', expected: true },
    { postalCode: '12345', countryCode: 'DE', expected: true },
    { postalCode: '123-4567', countryCode: 'JP', expected: true },
    { postalCode: '1234 AB', countryCode: 'NL', expected: true },
    { postalCode: '1234AB', countryCode: 'NL', expected: true },
  ];

  it.each(createTestCasesInput(testCases))(
    'isPostalCode(%s, %s) -> %s',
    (postalCode, countryCode, expected) => {
      expect(isPostalCode(postalCode, countryCode)).toBe(expected);
    },
  );
});

describe('should return false for invalid postal codes', () => {
  const testCases = [
    { postalCode: 'INVALID', countryCode: 'GB', expected: false },
    { postalCode: '123456', countryCode: 'GB', expected: false },
    { postalCode: 'ABCD EFG', countryCode: 'GB', expected: false },
    // { postalCode: 'GIR 0AAA', countryCode: 'GB', expected: false },
    { postalCode: 'BFPO', countryCode: 'GB', expected: false },
    // { postalCode: 'GIR0AA', countryCode: 'GB', expected: false },
    { postalCode: 'JE1', countryCode: 'JE', expected: false },
    { postalCode: 'GY1', countryCode: 'GG', expected: false },
    { postalCode: 'IM1', countryCode: 'IM', expected: false },
    { postalCode: '12345--', countryCode: 'US', expected: false },
    { postalCode: '12345--1234', countryCode: 'US', expected: false },
    { postalCode: '12345  ', countryCode: 'US', expected: false },
    { postalCode: '12345  1234', countryCode: 'US', expected: false },
    { postalCode: 'K1A--0B1', countryCode: 'CA', expected: false },
    { postalCode: '1234', countryCode: 'DE', expected: false },
    { postalCode: '1234-567', countryCode: 'JP', expected: false },
    { postalCode: '1234  AB', countryCode: 'NL', expected: false },
    { postalCode: '1234 Ab', countryCode: 'NL', expected: false },
    { postalCode: '1234 ABC', countryCode: 'NL', expected: false },
    { postalCode: '1234A', countryCode: 'NL', expected: false },
    { postalCode: '1234a', countryCode: 'NL', expected: false },
  ];

  it.each(createTestCasesInput(testCases))(
    'isPostalCode(%s, %s) -> %s',
    (postalCode, countryCode, expected) => {
      expect(isPostalCode(postalCode, countryCode)).toBe(expected);
    },
  );
});

describe('should handle various edge cases', () => {
  const testCases = [
    { postalCode: '', countryCode: 'GB', expected: false },
    { postalCode: '123', countryCode: 'US', expected: false },
    { postalCode: '123456789010', countryCode: 'US', expected: false },
    { postalCode: '12 3 4 56789', countryCode: 'US', expected: false },
    { postalCode: '12-3-4-56789', countryCode: 'US', expected: false },
    { postalCode: ' ', countryCode: 'CA', expected: false },
    { postalCode: '', countryCode: 'DE', expected: false },
    { postalCode: 'K1A 0B1', countryCode: 'DE', expected: false },
    { postalCode: '', countryCode: 'NL', expected: false },
    { postalCode: '1234ABCD ', countryCode: 'NL', expected: false },
    { postalCode: '12 34AB', countryCode: 'NL', expected: false },
    { postalCode: '12345AB', countryCode: 'NL', expected: false },
  ];

  it.each(createTestCasesInput(testCases))(
    'isPostalCode(%s, %s) -> %s',
    (postalCode, countryCode, expected) => {
      expect(isPostalCode(postalCode, countryCode)).toBe(expected);
    },
  );
});
