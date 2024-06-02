import styles from '@pages/authorization/style.module.css';

import { FC, HTMLInputTypeAttribute } from 'react';

interface TextFieldProps {
  labelTitle: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

const InputField: FC<TextFieldProps> = ({
  labelTitle: label,
  name,
  type,
  value,
  onChange,
  error,
  autoComplete = 'username',
}) => (
  <div className={styles.fieldContainer}>
    <label>{label}</label>
    <input
      className={styles.input}
      type={type}
      name={name}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputField;
