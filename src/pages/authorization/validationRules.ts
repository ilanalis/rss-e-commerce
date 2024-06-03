import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateDateOfBirth,
  validateStreet,
  validateCity,
  validatePostalCode,
} from './validation';

const validationRules = {
  email: validateEmail,
  password: validatePassword,
  firstName: validateFirstName,
  lastName: validateLastName,
  dateOfBirth: validateDateOfBirth,
  shippingStreet: validateStreet,
  shippingCity: validateCity,
  shippingPostalCode: validatePostalCode,
  billingStreet: validateStreet,
  billingCity: validateCity,
  billingPostalCode: validatePostalCode,
};

export const getValidationRules = (keys: string[]) =>
  Object.fromEntries(Object.entries(validationRules).filter(([key]) => keys.includes(key)));
