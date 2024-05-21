import ValidatableInput, { ValidatableInputProps } from '../validatable-input/';

const DateInput: React.FC<Omit<ValidatableInputProps, 'type'>> = (props) => {
  return <ValidatableInput {...props} type="date" />;
};

export default DateInput;
