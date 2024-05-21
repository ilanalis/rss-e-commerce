import ValidatableInput, { ValidatableInputProps } from '../validatable-input/';

const TextInput: React.FC<Omit<ValidatableInputProps, 'type'>> = (props) => {
  return <ValidatableInput {...props} type="text" />;
};

export default TextInput;
