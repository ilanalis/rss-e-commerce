import styles from '@pages/authorization/style.module.css';
import { FC } from 'react';
import useFormValidation, { FormState } from '../useFormValidation';
import { validationRules } from '../validationRules';
import PasswordInput from '../components/password-input';

const LoginForm: FC = () => {
  const initialState: FormState = { email: '', password: '' };
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validationRules,
  );

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
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
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
