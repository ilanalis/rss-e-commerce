import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateDateOfBirth,
  validateStreet,
  validateCity,
  validatePostalCode,
} from '@pages/authorization/validation';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should return error for email with spaces', () => {
      expect(validateEmail('test @example.com')).toBe('Email must not contain space characters');
    });

    it('should return error for email without @ symbol', () => {
      expect(validateEmail('testexample.com')).toBe('`@` sign is missing');
    });

    it('should return error for email with invalid local part', () => {
      expect(validateEmail('')).toBe(
        'Email format before `@` is invalid. Format must be example@email.com',
      );
    });

    it('should return error for email with invalid domain part', () => {
      expect(validateEmail('test@com')).toBe(
        'Email format after `@` is invalid. Format must be example@email.com',
      );
    });

    it('should return error for email with invalid format', () => {
      expect(validateEmail('test@com.com`')).toBe(
        'Email format after `@` is invalid. Format must be example@email.com',
      );
    });

    it('should return no error for valid email', () => {
      expect(validateEmail('test@example.com')).toBe('');
    });

    it('should return a constructed message for an invalid email that passes other checks', () => {
      expect(validateEmail('invalid-email@domain@domain.com')).toBe(
        ` Use one '@', letters, numbers and symbols: . ! # $ % & ' * + / = ? ^ _ \\ \` { | } ~ -`,
      );
    });
  });

  describe('validatePassword', () => {
    it('should return error for password with spaces', () => {
      expect(validatePassword('Test pass1!')).toBe('Password must not contain space characters');
    });

    it('should return error for password without lowercase letters', () => {
      expect(validatePassword('TESTPASS1!')).toBe(
        'Password must contain at least one small letter (a-z)',
      );
    });

    it('should return error for password without uppercase letters', () => {
      expect(validatePassword('testpass1!')).toBe(
        'Password must contain at least one capital letter (A-Z)',
      );
    });

    it('should return error for password without numbers', () => {
      expect(validatePassword('Testpass!')).toBe('Password must contain at least one digit (0-9)');
    });

    it('should return error for password without special characters', () => {
      expect(validatePassword('Testpass1')).toBe(
        'Password must contain at least one special character (e.g. !@#$%^&*)',
      );
    });

    it('should return error for password shorter than minimum length', () => {
      expect(validatePassword('Tes1!')).toBe('Password must be at least 8 characters long.');
    });

    it('should return no error for valid password', () => {
      expect(validatePassword('Testpass1!')).toBe('');
    });
  });

  describe('validateFirstName', () => {
    it('should return error for name with special characters', () => {
      expect(validateFirstName('John@')).toBe(
        'First name must not contain special characters (e.g. !@#$%^&*)',
      );
    });

    it('should return error for name with numbers', () => {
      expect(validateFirstName('John1')).toBe('First name must not contain numbers');
    });

    it('should return error for name without letters', () => {
      expect(validateFirstName('')).toBe('First name must contain at least one letter (a-z, A-Z)');
    });

    it('should return no error for valid name', () => {
      expect(validateFirstName('John')).toBe('');
    });
  });

  describe('validateLastName', () => {
    it('should return error for name with special characters', () => {
      expect(validateLastName('Doe@')).toBe(
        'Last name must not contain special characters (e.g. !@#$%^&*)',
      );
    });

    it('should return error for name with numbers', () => {
      expect(validateLastName('Doe1')).toBe('Last name must not contain numbers');
    });

    it('should return error for name without letters', () => {
      expect(validateLastName('1234')).toBe('Last name must not contain numbers');
    });

    it('should return error for name without letters', () => {
      expect(validateLastName('')).toBe('Last name must contain at least one letter (a-z, A-Z)');
    });

    it('should return no error for valid name', () => {
      expect(validateLastName('Doe')).toBe('');
    });
  });

  describe('validateDateOfBirth', () => {
    it('should return error for age below minimum', () => {
      expect(validateDateOfBirth('2015-05-20')).toBe('Your age must be 13 or older');
    });

    it('should return no error for age above minimum', () => {
      expect(validateDateOfBirth('2000-05-20')).toBe('');
    });
  });

  describe('validateStreet', () => {
    it('should return error for street without letters', () => {
      expect(validateStreet('1234')).toBe('Street must contain at least one letter (a-z, A-Z)');
    });

    it('should return no error for valid street', () => {
      expect(validateStreet('Main St')).toBe('');
    });
  });

  describe('validateCity', () => {
    it('should return error for city with special characters', () => {
      expect(validateCity('New@York')).toBe(
        'City must not contain special characters (e.g. !@#$%^&*)',
      );
    });

    it('should return error for city with numbers', () => {
      expect(validateCity('NewYork1')).toBe('City must not contain numbers');
    });

    it('should return error for city with numbers', () => {
      expect(validateCity('1234')).toBe('City must not contain numbers');
    });

    it('should return error for name without letters', () => {
      expect(validateCity('')).toBe('City must contain at least one letter (a-z, A-Z)');
    });

    it('should return error for city with space', () => {
      expect(validateCity('New York')).toBe(
        'City must not contain special characters (e.g. !@#$%^&*)',
      );
    });

    it('should return no error for city with correct format', () => {
      expect(validateCity('Tobolsk')).toBe('');
    });
  });

  describe('validatePostalCode', () => {
    it('should return error for invalid postal code format', () => {
      expect(validatePostalCode('1234', 'US')).toBe('Must follow the format for the country');
    });

    it('should return no error for valid postal code format', () => {
      expect(validatePostalCode('12345', 'US')).toBe('');
    });
  });
});
