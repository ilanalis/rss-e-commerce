import { describe, it, expect } from 'vitest';
import { hasEmailLocalPart, hasEmailSeparator, hasEmailDomainPart } from '@utils/form-validation/';

/* Valid email addresses source:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation */

describe('Test Email Local Part', () => {
  /* Allowed characters:
    1. Alphabetical letters
    2. Numbers
    3. Special characters including . ! # $ % & ' * + / = ? ^ _ \ ` { | } ~ - */

  const ALLOWED_SPECIAL_CHARACTERS = ". ! # $ % & ' * + / = ? ^ _ \\ ` { | } ~ -".split(' ');

  it.each([
    ['username', true],
    ['user123', true],
    ['user.name', true],
    ['user_name', true],
    ['user-name', true],
    ['user+name', true],
    ['user@name', true],
    ['user@', true],
    ['user\\name', true],
    ['user@@', true],
    ['user@@@', true],
    ['user@@@asdf', true],
    ['user@@@ya.ru', true],
    ['', false],
    ...ALLOWED_SPECIAL_CHARACTERS.map((specialCharacter): [string, boolean] => [
      `user${specialCharacter}name`,
      true,
    ]),
  ])('hasEmailLocalPart(%s) -> %s', (email, expected) => {
    expect(hasEmailLocalPart(email)).toBe(expected);
  });
});

describe('Test Email Separator', () => {
  it.each([
    ['some@email.com', true],
    ['user@domain', true],
    ['user-domain@', true],
    ['user.domain@@', true],
    ['user.domain@mail@ru', true],
    ['user.domain', false],
  ])('hasEmailSeparator(%s) -> %s', (email, expected) => {
    expect(hasEmailSeparator(email)).toBe(expected);
  });
});

describe('Test Email Domain Part', () => {
  /* Correct formats: @example.com, @sub.example.com etc */

  it.each([
    ['aaa@sub.domain', true],
    ['aaa@domain.com', true],
    ['aaa@sub-domain', false],
    ['aaa@sub@domain', false],
    ['aaa@sub@domain@incorrect-domain-no-more-than-one-separator-allowed', false],
  ])('hasEmailDomainPart(%s) -> %s', (email, expected) => {
    expect(hasEmailDomainPart(email)).toBe(expected);
  });
});

describe('Test Full Email Address', () => {
  it.each([
    ['user@domain.com', true],
    ['user123@domain.com', true],
    ['user.name@sub.domain.com', true],
    ['user-name_)(@sub.domain.com', true],
    ['user+name9928@sub.domain.com', true],
    ['user@domain', false],
    ['user@domain@com', false],
    ['user@@domain@isIncorrect', false],
    ['user+name@sub.domain.com@', false],
  ])('hasEmailLocalPart(%s) -> %s', (email, expected) => {
    expect(hasEmailLocalPart(email) && hasEmailSeparator(email) && hasEmailDomainPart(email)).toBe(
      expected,
    );
  });
});
