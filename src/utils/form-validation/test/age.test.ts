import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { isAgeAboveMinimum } from '@utils/form-validation/';

describe('Test Age Restriction', () => {
  let originalDateNow: () => number;

  beforeEach(() => {
    const currentDate = new Date();
    originalDateNow = Date.now;
    vi.spyOn(Date, 'now').mockImplementation(() => currentDate.getTime());
  });

  afterEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(originalDateNow);
  });

  const LOCALES_ARGUMENT = 'ru-RU';
  const AGE_LIMIT = 18;
  const AGES_COUNT = 2 * AGE_LIMIT;
  const AGE_ADJUSTMENT_VALUES = Array.from({ length: AGES_COUNT }, (_, i) => i);

  it.each([
    ...AGE_ADJUSTMENT_VALUES.map((ageAdjustment): [string, number, boolean, number] => {
      const dateOfBirth = new Date();
      dateOfBirth.setFullYear(dateOfBirth.getFullYear() - ageAdjustment);

      const dateOfBirthFormatted = dateOfBirth
        .toLocaleDateString(LOCALES_ARGUMENT)
        .replace(/\./g, '-');

      return [dateOfBirthFormatted, AGE_LIMIT, ageAdjustment >= AGE_LIMIT, ageAdjustment];
    }),
  ])('isAgeAboveMinimum(%s, %d) -> %s, %s years old person', (date, ageLimit, expected) => {
    expect(isAgeAboveMinimum(date, ageLimit)).toBe(expected);
  });

  it('should return false for invalid date format', () => {
    console.error = vi.fn();
    expect(isAgeAboveMinimum('2024/05/16', 18)).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Expected dd-mm-yyyy format, got ', '2024/05/16');
  });
});
