import React, { useState } from 'react';
import ValidatableInput, { ValidatableInputProps } from '../validatable-input/';
import styles from './style.module.css';

const PasswordInput: React.FC<Omit<ValidatableInputProps, 'type'>> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.passwordContainer}>
      <ValidatableInput {...props} type={showPassword ? 'text' : 'password'} />
      <button type="button" onClick={togglePasswordVisibility} className={styles.toggleButton}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordInput;
