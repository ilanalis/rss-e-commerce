import data from '@utils/form-validation/postal-codes/data.json';

interface PostalCode {
  [countryCode: string]: RegExp;
}

export const POSTAL_CODES_REG_EXP: PostalCode = Object.fromEntries(
  data.postalCodeRegex.map(({ _territoryId, __text }) => [_territoryId, new RegExp(`^${__text}$`)]),
);

export const COUNTRIES_CODES = Object.keys(POSTAL_CODES_REG_EXP);
