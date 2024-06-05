import styles from '@pages/authorization/style.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { useApiRootContext } from '@contexts/useApiRootContext';
import { useUserContext } from '@contexts/useUserContext';

import { login } from '@utils/api/commercetools-api';
import notify from '@utils/notify';

import useFormValidation, { FormState } from '@pages/authorization/useFormValidation';
import PasswordInput from '@pages/authorization/components/password-input';
import { initialLoginData, inputNames } from '@/pages/authorization/forms-config';
import { getValidationRules } from '@pages/authorization/validationRules';
import InputField from '@pages/authorization/components/input-field';

const LoginForm: FC = () => {
  const initialState: FormState = initialLoginData;
  const { values, errors, handleChange, isFormValid } = useFormValidation(
    initialState,
    getValidationRules(Object.keys(initialState)),
  );

  const { apiRoot, setApiRoot } = useApiRootContext();
  const { setIsUserLoggedIn } = useUserContext();

  async function loginUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (apiRoot) {
      const response = await login(apiRoot, values.email, values.password);

      if (response.success && response.apiBuilder) {
        setApiRoot(response.apiBuilder);
        setIsUserLoggedIn(true);
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    }
  }

  return (
    <form className={styles.formContainer}>
      <InputField
        labelTitle="Email"
        name={inputNames.email}
        type="text"
        value={values[inputNames.email]}
        onChange={handleChange}
        error={errors[inputNames.email]}
        autoComplete={`user-${inputNames.email}`}
        styles={styles}
      />
      <div className={styles.fieldContainer}>
        <label>Password:</label>
        <PasswordInput
          name={inputNames.password}
          value={values[inputNames.password]}
          onChange={handleChange}
        />
        {errors[inputNames.password] && (
          <span className={styles.error}>{errors[inputNames.password]}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={!isFormValid()}
        className={styles.submitButton}
        onClick={loginUser}
      >
        Login
      </button>
      <ToastContainer position="bottom-right" />
    </form>
  );
};

export default LoginForm;
