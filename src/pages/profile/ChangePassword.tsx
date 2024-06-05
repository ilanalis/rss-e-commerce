import styles from './style.module.css';
import { FC } from 'react';
import PasswordInput from '../authorization/components/password-input';
import { inputNames } from '../authorization/forms-config';
import { getValidationRules } from '../authorization/validationRules';
import useFormValidation from '../authorization/useFormValidation';

const ChangePassword: FC = () => {
  const initialState = {
    password: '',
  };
  const { values, errors, handleChange } = useFormValidation(
    initialState,
    getValidationRules(Object.keys(initialState)),
  );

  return (
    <>
      <div className={styles.fieldContainer}>
        <label>Current password:</label>
        <PasswordInput
          name={inputNames.password}
          value={values[inputNames.password]}
          onChange={handleChange}
          isDisabled={true}
        />
        {errors[inputNames.password] && (
          <span className={styles.error}>{errors[inputNames.password]}</span>
        )}
      </div>
      <div className={styles.fieldContainer}>
        <label>New password:</label>
        <PasswordInput
          name={inputNames.password}
          value={values[inputNames.password]}
          onChange={handleChange}
          isDisabled={true}
        />
        {errors[inputNames.password] && (
          <span className={styles.error}>{errors[inputNames.password]}</span>
        )}
      </div>
      <button className={styles.btn}>Change Password</button>
    </>
  );
};

export default ChangePassword;
