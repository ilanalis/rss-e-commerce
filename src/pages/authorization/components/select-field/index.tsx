import styles from '@pages/authorization/style.module.css';

import { FC } from 'react';

interface SelectFieldProps {
  labelTitle: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; labelTitle: string }[];
  error?: string;
}

const SelectField: FC<SelectFieldProps> = ({
  labelTitle,
  name,
  value,
  onChange,
  options,
  error,
}) => (
  <div className={styles.fieldContainer}>
    <label htmlFor={name}>{labelTitle}</label>
    <select
      className={styles.countriesSelect}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.labelTitle}
        </option>
      ))}
    </select>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default SelectField;
