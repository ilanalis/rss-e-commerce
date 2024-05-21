import styles from '../style.module.css';

import { FC } from 'react';

import TextInput from '@/pages/authorization/components/text-input';
import { InputProps } from '@pages/authorization/config';
import PasswordInput from '@/pages/authorization/components/password-input';
import SubmitButton from '../components/submit-button';

const LoginForm: FC = () => {
  return (
    <form className={styles.formContainer}>
      <TextInput {...InputProps.EMAIL} />
      <PasswordInput {...InputProps.PASSWORD} />
      <SubmitButton
        id="login-button"
        title="Log in"
        onButtonClick={() => console.log('login clicked')}
      />
    </form>
  );
};

export default LoginForm;
