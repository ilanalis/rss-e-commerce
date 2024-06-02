import { useState } from 'react';

export type FormState = Record<string, string>;
type FormErrors = Record<string, string | undefined>;

type ValidationFunction = (value: string, ...argsForValidation: string[]) => string;

const useFormValidation = (
  initialState: FormState,
  validate: { [key: string]: ValidationFunction },
) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ...argsForValidation: string[]
  ) => {
    const { name, value } = e.target;

    changeValues(
      {
        [name]: value,
      },
      ...argsForValidation,
    );
  };

  const changeValues = (
    newValues: React.SetStateAction<FormState>,
    ...argsForValidation: string[]
  ) => {
    setValues({
      ...values,
      ...newValues,
    });
    Object.entries(newValues).forEach(([name, newValue]) =>
      validateValue(name, newValue, ...argsForValidation),
    );
  };

  const validateValue = (name: string, newValue: string, ...argsForValidation: string[]) => {
    if (validate[name]) {
      const error = validate[name](newValue, ...argsForValidation);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || undefined,
      }));
    }
  };

  const isFormValid = () =>
    Object.values(errors).length === Object.values(validate).length &&
    Object.values(errors).every((error) => error === undefined);

  return { values, errors, handleChange, changeValues, validateValue, isFormValid };
};

export default useFormValidation;
