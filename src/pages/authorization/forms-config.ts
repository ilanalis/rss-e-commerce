export enum inputNames {
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  dateOfBirth = 'dateOfBirth',
  shippingStreet = 'shippingStreet',
  shippingCity = 'shippingCity',
  shippingPostalCode = 'shippingPostalCode',
  shippingCountry = 'shippingCountry',
  billingStreet = 'billingStreet',
  billingCity = 'billingCity',
  billingPostalCode = 'billingPostalCode',
  billingCountry = 'billingCountry',
  defaultBilling = 'defaultBilling',
  defaultShipping = 'defaultShipping',
  billingAddress = 'billingAddress',
  newPassword = 'newPassword',
}

export const COUNTRY_OPTIONS = [
  { value: 'US', labelTitle: 'United States' },
  { value: 'DE', labelTitle: 'Germany' },
  { value: 'NL', labelTitle: 'Netherlands' },
  { value: 'RU', labelTitle: 'Russia' },
];
const DEFAULT_INPUT_VALUE = '';
const DEFAULT_COUNTRY_CODE = COUNTRY_OPTIONS[0].value;

export const initialRegistrationData = Object.fromEntries(
  Object.values(inputNames).map((inputName) => {
    if (inputName === 'newPassword') return [];
    if (inputName === inputNames.billingCountry || inputName === inputNames.shippingCountry) {
      return [inputName, DEFAULT_COUNTRY_CODE];
    }
    return [inputName, DEFAULT_INPUT_VALUE];
  }),
);

export const initialLoginData = Object.fromEntries([
  [inputNames.email, DEFAULT_INPUT_VALUE],
  [inputNames.password, DEFAULT_INPUT_VALUE],
]);
