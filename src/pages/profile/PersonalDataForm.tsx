import styles from './style.module.css';
import cn from 'classnames';
import InputField from '../authorization/components/input-field';
import { inputNames } from '../authorization/forms-config';
import useFormValidation from '../authorization/useFormValidation';
import { getValidationRules } from '../authorization/validationRules';
import { FC, useEffect } from 'react';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { updatePersonalInfo } from '@/utils/api/user-api';
import notify from '@/utils/notify';
import { getUserInfo } from '@/utils/api/commercetools-api';
import { Customer } from '@commercetools/platform-sdk';

interface PersonalDataFormProps {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const PersonalDataForm: FC<PersonalDataFormProps> = ({
  email,
  firstName = '',
  lastName = '',
  dateOfBirth = '',
  setIsEdit,
  setUserInfo,
}) => {
  const { apiRoot } = useApiRootContext();

  const initialState = {
    email,
    firstName,
    lastName,
    dateOfBirth,
  };

  const { values, errors, handleChange, isFormValid, changeValues } = useFormValidation(
    initialState,
    getValidationRules(Object.keys(initialState)),
  );

  useEffect(() => {
    const newValues = { email, firstName, lastName, dateOfBirth };
    changeValues(newValues);
  }, []);

  async function updateUserData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (apiRoot) {
      const response = await updatePersonalInfo(
        apiRoot,
        values.firstName,
        values.lastName,
        values.dateOfBirth,
        values.email,
      );
      if (response.success) {
        notify('Successful updating data!');
        const fetchUserInfo = async () => {
          if (apiRoot) {
            const data = await getUserInfo(apiRoot);
            if (data) setUserInfo(data);
          }
        };
        fetchUserInfo();
        setIsEdit(false);
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    }
  }

  return (
    <form className={styles.dataForm} onSubmit={updateUserData}>
      <InputField
        labelTitle="Email"
        name={inputNames.email}
        type="text"
        value={values[inputNames.email]}
        onChange={handleChange}
        error={errors[inputNames.email]}
        autoComplete={`user-${inputNames.email}`}
        styles={styles}
        isDisabled={false}
      />
      <InputField
        labelTitle="First Name"
        type="text"
        name={inputNames.firstName}
        value={values[inputNames.firstName]}
        onChange={handleChange}
        error={errors[inputNames.firstName]}
        autoComplete={`user-${inputNames.firstName}`}
        styles={styles}
      />
      <InputField
        labelTitle="Last Name"
        type="text"
        name={inputNames.lastName}
        value={values[inputNames.lastName]}
        onChange={handleChange}
        error={errors[inputNames.lastName]}
        autoComplete={`user-${inputNames.lastName}`}
        styles={styles}
      />
      <InputField
        labelTitle="Date of Birth"
        type="date"
        name={inputNames.dateOfBirth}
        value={values[inputNames.dateOfBirth]}
        onChange={handleChange}
        error={errors[inputNames.dateOfBirth]}
        autoComplete={`user-${inputNames.dateOfBirth}`}
        styles={styles}
      />
      <div className={styles.buttonsBlock}>
        <button disabled={!isFormValid()} type="submit" className={styles.btn}>
          Save
        </button>
        <button className={cn(styles.btn, styles.btnGray)} onClick={() => setIsEdit(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default PersonalDataForm;
