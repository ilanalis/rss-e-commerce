import { FC, useState } from 'react';
import styles from './style.module.css';
import PersonalDataForm from './PersonalDataForm';
import { Customer } from '@commercetools/platform-sdk';

interface PersonalInfoProps {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const PersonalInfo: FC<PersonalInfoProps> = ({
  email = '',
  firstName = '',
  lastName = '',
  dateOfBirth = '',
  setUserInfo,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return isEdit ? (
    <PersonalDataForm
      email={email}
      firstName={firstName}
      lastName={lastName}
      dateOfBirth={dateOfBirth}
      setIsEdit={setIsEdit}
      setUserInfo={setUserInfo}
    />
  ) : (
    <div className={styles.dataBlock}>
      <div className={styles.data}>
        <span className={styles.title}>Email:</span>
        <span className={styles.dataItem}>{email}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.title}>First Name:</span>
        <span className={styles.dataItem}>{firstName}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.title}>Last Name:</span>
        <span className={styles.dataItem}>{lastName}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.title}>Date of birth:</span>
        <span className={styles.dataItem}>{dateOfBirth}</span>
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          setIsEdit(true);
        }}
      >
        Change personal data
      </button>
    </div>
  );
};

export default PersonalInfo;
