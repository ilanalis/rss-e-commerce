import authorizationStyles from '@pages/authorization/style.module.css';
import styles from './style.module.css';
import cn from 'classnames';

import { FC, useState } from 'react';

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  title?: string;
  id?: string;
  placeholder?: string;
  autoComplete?: string;
  isDisabled?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
  name,
  value,
  onChange,
  error,
  title,
  id,
  placeholder,
  autoComplete = 'current-password',
  isDisabled = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles.passwordContainer}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        title={title}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={
          isDisabled ? cn(authorizationStyles.input, styles.disabled) : authorizationStyles.input
        }
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className={styles.toggleButton}
      >
        {isPasswordVisible ? 'Hide' : 'Show'}
      </button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default PasswordInput;
