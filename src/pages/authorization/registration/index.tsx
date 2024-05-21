import styles from '../style.module.css';

import { FC } from 'react';

import TextInput from '@/pages/authorization/components/text-input';
import PasswordInput from '@/pages/authorization/components/password-input';
import DateInput from '@/pages/authorization/components/date-input';
import CountriesList from '@/pages/authorization/components/countries-list';
import { InputProps } from '@pages/authorization/config';
import SubmitButton from '../components/submit-button';

const RegistrationForm: FC = () => {
  return (
    <form className={styles.formContainer}>
      <TextInput {...InputProps.EMAIL} />
      <PasswordInput {...InputProps.PASSWORD} />
      <TextInput {...InputProps.FIRST_NAME} />
      <DateInput {...InputProps.DATE_OF_BIRTH} />
      <CountriesList {...InputProps.COUNTRY} />
      <TextInput {...InputProps.STREET} />
      <TextInput {...InputProps.CITY} />
      <TextInput {...InputProps.POSTAL_CODE} />
      <SubmitButton
        id="singup-button"
        title="Sign up"
        onButtonClick={() => console.log('sign-up clicked')}
      />
    </form>
  );
};

export default RegistrationForm;
