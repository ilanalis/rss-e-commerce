import styles from '@pages/authorization/style.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import useFormValidation, { FormState } from '../useFormValidation';
import { validationRules } from '../validationRules';
import PasswordInput from '../components/password-input';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { useUserContext } from '@/contexts/useUserContext';
import { login } from '@/utils/api/commercetools-api';
import notify from '@/utils/notify';

const LoginForm: FC = () => {
  const initialState: FormState = { email: '', password: '' };
  const { values, errors, handleChange } = useFormValidation(initialState, validationRules);

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
      <div className={styles.fieldContainer}>
        <label>Email:</label>
        <input
          className={styles.input}
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Password:</label>
        <PasswordInput name="password" value={values.password} onChange={handleChange} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      <button
        type="submit"
        disabled={
          Object.values(errors).some((error) => error !== undefined) ||
          Object.values(values).some((value) => value === '')
        }
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
