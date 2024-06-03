import {
  EMAIL_SPECIAL_CHARACTERS,
  RegExpKeys,
  hasAnyLetter,
  hasCapitalLetters,
  hasEmail,
  hasEmailDomainPart,
  hasEmailLocalPart,
  hasEmailSeparator,
  hasNumbers,
  hasSmallLetters,
  hasSpaces,
  hasSpecialCharacters,
  isAgeAboveMinimum,
  isPostalCode,
  isStringLongEnough,
} from '@utils/form-validation/';

type ValidationFunction = (inputValue: string) => string;

type ExcludedKeys = 'EMAIL_LOCAL_PART' | 'EMAIL_SEPARATOR' | 'EMAIL_DOMAIN_PART' | 'EMAIL' | 'DATE';

type MessageArg = Exclude<RegExpKeys, ExcludedKeys> | 'NO_NUMBERS' | 'NO_SPECIAL_CHARACTERS';

type MessageFunction = (rule: MessageArg, fieldName: string) => string;

const constructMessageForRegex: MessageFunction = (rule, fieldName) => {
  const MESSAGES: Record<MessageArg, string> = {
    CAPITAL_LETTERS: 'must contain at least one capital letter (A-Z)',
    SMALL_LETTERS: 'must contain at least one small letter (a-z)',
    NUMBERS: 'must contain at least one digit (0-9)',
    SPECIAL_CHARACTERS: `must contain at least one special character (e.g. !@#$%^&*)`,
    ANY_LETTER: 'must contain at least one letter (a-z, A-Z)',
    SPACES: 'must not contain space characters',
    NO_NUMBERS: 'must not contain numbers',
    NO_SPECIAL_CHARACTERS: `must not contain special characters (e.g. !@#$%^&*)`,
  };

  return `${fieldName} ${MESSAGES[rule]}`;
};

export const supportedCountries = ['US', 'NL', 'RU', 'GB'];

export const validateEmail: ValidationFunction = (inputValue) => {
  const constructMessage = (error: string) =>
    `${error} ${error ? '. ' : ''}Use one '@', letters, numbers and symbols: ${EMAIL_SPECIAL_CHARACTERS}`;

  if (hasSpaces(inputValue)) {
    return 'Email must not contain space characters';
  }

  if (!hasEmailLocalPart(inputValue)) {
    return 'Email format before `@` is invalid. Format must be example@email.com';
  }

  if (!hasEmailSeparator(inputValue)) {
    return '`@` sign is missing';
  }

  if (!hasEmailDomainPart(inputValue)) {
    return 'Email format after `@` is invalid. Format must be example@email.com';
  }

  if (!hasEmail(inputValue)) {
    return constructMessage('');
  }

  return '';
};

export const validatePassword: ValidationFunction = (inputValue) => {
  const FIELD_NAME = 'Password';
  const MIN_LENGTH = 8;

  if (hasSpaces(inputValue)) {
    return constructMessageForRegex('SPACES', FIELD_NAME);
  }

  if (!hasSmallLetters(inputValue)) {
    return constructMessageForRegex('SMALL_LETTERS', FIELD_NAME);
  }

  if (!hasCapitalLetters(inputValue)) {
    return constructMessageForRegex('CAPITAL_LETTERS', FIELD_NAME);
  }

  if (!hasNumbers(inputValue)) {
    return constructMessageForRegex('NUMBERS', FIELD_NAME);
  }

  if (!hasSpecialCharacters(inputValue)) {
    return constructMessageForRegex('SPECIAL_CHARACTERS', FIELD_NAME);
  }

  if (!isStringLongEnough(inputValue, MIN_LENGTH)) {
    return `Password must be at least ${MIN_LENGTH} characters long.`;
  }

  return '';
};

export const validateFirstName: ValidationFunction = (inputValue) => {
  const FIELD_NAME = 'First name';

  if (hasSpecialCharacters(inputValue) || hasSpaces(inputValue)) {
    return constructMessageForRegex('NO_SPECIAL_CHARACTERS', FIELD_NAME);
  }

  if (hasNumbers(inputValue)) {
    return constructMessageForRegex('NO_NUMBERS', FIELD_NAME);
  }

  if (!hasAnyLetter(inputValue)) {
    return constructMessageForRegex('ANY_LETTER', FIELD_NAME);
  }

  return '';
};

export const validateLastName: ValidationFunction = (inputValue) => {
  const FIELD_NAME = 'Last name';

  if (hasSpecialCharacters(inputValue) || hasSpaces(inputValue)) {
    return constructMessageForRegex('NO_SPECIAL_CHARACTERS', FIELD_NAME);
  }

  if (hasNumbers(inputValue)) {
    return constructMessageForRegex('NO_NUMBERS', FIELD_NAME);
  }

  if (!hasAnyLetter(inputValue)) {
    return constructMessageForRegex('ANY_LETTER', FIELD_NAME);
  }

  return '';
};

export const validateDateOfBirth: ValidationFunction = (inputValue) => {
  const MIN_AGE = 13;

  const dateStr = inputValue.split('-').reverse().join('-');

  if (!isAgeAboveMinimum(dateStr, MIN_AGE)) {
    return `Your age must be ${MIN_AGE} or older`;
  }

  return '';
};

export const validateStreet: ValidationFunction = (inputValue) => {
  const FIELD_NAME = 'Street';

  if (!hasAnyLetter(inputValue)) {
    return constructMessageForRegex('ANY_LETTER', FIELD_NAME);
  }

  return '';
};

export const validateCity: ValidationFunction = (inputValue) => {
  const FIELD_NAME = 'City';

  if (hasSpecialCharacters(inputValue) || hasSpaces(inputValue)) {
    return constructMessageForRegex('NO_SPECIAL_CHARACTERS', FIELD_NAME);
  }

  if (hasNumbers(inputValue)) {
    return constructMessageForRegex('NO_NUMBERS', FIELD_NAME);
  }

  if (!hasAnyLetter(inputValue)) {
    return constructMessageForRegex('ANY_LETTER', FIELD_NAME);
  }

  return '';
};

export const validatePostalCode = (inputValue: string, countryCode: string) => {
  if (!isPostalCode(inputValue, countryCode)) {
    return `Must follow the format for the country`;
  }

  return '';
};
