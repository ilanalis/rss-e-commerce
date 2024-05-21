import { ValidatableInputProps } from '@pages/authorization/components/validatable-input';
import { CountriesListProps } from '@pages/authorization/components/countries-list';

type InputKeys =
  | 'EMAIL'
  | 'PASSWORD'
  | 'FIRST_NAME'
  | 'LAST_NAME'
  | 'DATE_OF_BIRTH'
  | 'STREET'
  | 'CITY'
  | 'POSTAL_CODE'
  | 'COUNTRY';

type InputPropsMap = {
  EMAIL: ValidatableInputProps;
  PASSWORD: ValidatableInputProps;
  FIRST_NAME: ValidatableInputProps;
  LAST_NAME: ValidatableInputProps;
  DATE_OF_BIRTH: ValidatableInputProps;
  STREET: ValidatableInputProps;
  CITY: ValidatableInputProps;
  POSTAL_CODE: ValidatableInputProps;
  COUNTRY: CountriesListProps;
};

type InputPropsRecord = {
  [K in InputKeys]: InputPropsMap[K];
};

const placeholderTemplate = (title: string) => `Your ${title} is ...`;

export const InputProps: InputPropsRecord = {
  EMAIL: {
    title: 'Email',
    placeholder: placeholderTemplate('email'),
    id: 'email',
  },
  PASSWORD: {
    title: 'Password',
    placeholder: placeholderTemplate('password'),
    id: 'password',
  },
  FIRST_NAME: {
    title: 'First name',
    placeholder: placeholderTemplate('first name'),
    id: 'first_name',
  },
  LAST_NAME: {
    title: 'Last name',
    placeholder: placeholderTemplate('last name'),
    id: 'last_name',
  },
  DATE_OF_BIRTH: {
    title: 'Date of birth',
    placeholder: placeholderTemplate('date of birth'),
    id: 'date_of_birth',
  },
  STREET: {
    title: 'Street',
    placeholder: placeholderTemplate('street'),
    id: 'street',
  },
  CITY: {
    title: 'City',
    placeholder: placeholderTemplate('city'),
    id: 'city',
  },
  POSTAL_CODE: {
    title: 'postal code',
    placeholder: placeholderTemplate('postal code'),
    id: 'postal_code',
  },
  COUNTRY: {
    title: 'Country',
    id: 'country',
  },
};
