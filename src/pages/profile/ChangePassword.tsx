import styles from './style.module.css';
import { FC } from 'react';
import PasswordInput from '../authorization/components/password-input';
import { inputNames } from '../authorization/forms-config';
import { getValidationRules } from '../authorization/validationRules';
import useFormValidation from '../authorization/useFormValidation';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { changePassword } from '@/utils/api/user-api';
import notify from '@/utils/notify';

const ChangePassword: FC = () => {
  const { apiRoot, setApiRoot } = useApiRootContext();

  const initialState = {
    password: '',
    newPassword: '',
  };

  const { values, errors, handleChange, changeValues, isFormValid, setErrors } = useFormValidation(
    initialState,
    getValidationRules(Object.keys(initialState)),
  );

  async function changeUserPassword() {
    if (apiRoot) {
      const response = await changePassword(apiRoot, values.password, values.newPassword);
      if (response.success && response.apiRoot) {
        notify('Successful changing password!');

        changeValues({ [inputNames.password]: '', [inputNames.newPassword]: '' });
        setErrors({ [inputNames.password]: undefined, [inputNames.newPassword]: undefined });
        setApiRoot(response.apiRoot);
        console.log(errors, errors[inputNames.newPassword]);
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    }
  }

  return (
    <>
      <div className={styles.fieldContainer}>
        <label>Current password:</label>
        <PasswordInput
          name={inputNames.password}
          value={values[inputNames.password]}
          onChange={handleChange}
        />
        {errors[inputNames.password] && (
          <span className={styles.error}>{errors[inputNames.password]}</span>
        )}
      </div>
      <div className={styles.fieldContainer}>
        <label>New password:</label>
        <PasswordInput
          name={inputNames.newPassword}
          value={values[inputNames.newPassword]}
          onChange={handleChange}
        />
        {errors[inputNames.newPassword] && (
          <span className={styles.error}>{errors[inputNames.newPassword]}</span>
        )}
      </div>
      <button disabled={!isFormValid()} className={styles.btn} onClick={changeUserPassword}>
        Change Password
      </button>
    </>
  );
};

export default ChangePassword;
