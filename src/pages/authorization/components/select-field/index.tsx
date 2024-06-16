import { FC } from 'react';
import { Styles } from '../input-field';

interface SelectFieldProps {
  labelTitle: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; labelTitle: string }[];
  styles: Styles;
  error?: string;
  isDisabled?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  labelTitle,
  name,
  value,
  onChange,
  options,
  error,
  styles,
  isDisabled,
}) => (
  <div className={styles.fieldContainer}>
    <label htmlFor={name}>{labelTitle}</label>
    <select
      className={styles.countriesSelect}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
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
