import { FC } from 'react';
import styles from './style.module.css';

interface PersonalInfoProps {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
}

const PersonalInfo: FC<PersonalInfoProps> = ({
  email = '',
  firstName = '',
  lastName = '',
  dateOfBirth = '',
}) => {
  return (
    <div className={styles.dataBlock}>
      <div className={styles.data}>
        <span className={styles.label}>Email:</span>
        <span className={styles.dataItem}>{email}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.label}>First Name:</span>
        <span className={styles.dataItem}>{firstName}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.label}>Last Name:</span>
        <span className={styles.dataItem}>{lastName}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.label}>Date of birth:</span>
        <span className={styles.dataItem}>{dateOfBirth}</span>
      </div>
      <button className={styles.btn} onClick={() => {}}>
        Change personal data
      </button>
    </div>
  );
};

export default PersonalInfo;
