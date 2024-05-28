import { useState } from 'react';

export type FormState = Record<string, string>;
type FormErrors = Record<string, string | undefined>;

type ValidationFunction = (value: string, ...args: string[]) => string;

const useFormValidation = (
  initialState: FormState,
  validate: { [key: string]: ValidationFunction },
) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ...args: string[]
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validate[name]) {
      const error = validate[name](value, ...args);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || undefined,
      }));
    }

    const postalCodeName = 'postalCode';
    if (name === 'country' && values[postalCodeName]) {
      if (errors[postalCodeName] || values[postalCodeName] !== '') {
        const error = validate[postalCodeName](values[postalCodeName], value);
        setErrors({
          ...errors,
          [postalCodeName]: error || undefined,
        });
      }
    }
  };

  return { values, errors, handleChange };
};

export default useFormValidation;
