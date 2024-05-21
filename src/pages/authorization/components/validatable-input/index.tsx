import { FC } from 'react';
import styles from './style.module.css';

export interface ValidatableInputProps {
  title: string;
  id: string;
  placeholder: string;
  type?: string;
}

const ValidatableInput: FC<ValidatableInputProps> = ({ title, id, placeholder, type = 'text' }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.title}>
        {title}
      </label>
      <input type={type} id={id} placeholder={placeholder} className={styles.input} />
    </div>
  );
};

export default ValidatableInput;
