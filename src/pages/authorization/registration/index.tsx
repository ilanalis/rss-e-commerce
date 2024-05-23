import styles from '@pages/authorization/style.module.css';
import { FC } from 'react';
import useFormValidation from '../useFormValidation';
import { validationRules } from '../validationRules';
import PasswordInput from '../components/password-input/';

const RegistrationForm: FC = () => {
  const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'US',
  };
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validationRules,
  );

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.fieldContainer}>
        <label>Email:</label>
        <input
          className={styles.input}
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Password:</label>
        <PasswordInput name="password" value={values.password} onChange={handleChange} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>First Name:</label>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Last Name:</label>
        <input
          className={styles.input}
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Date of Birth:</label>
        <input
          className={styles.input}
          type="date"
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="country">Country:</label>
        <select
          className={styles.countriesSelect}
          id="country"
          name="country"
          value={values.country}
          onChange={handleChange}
        >
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="NL">Netherlands</option>
          <option value="RU">Russia</option>
        </select>
        {errors.country && <span className={styles.error}>{errors.country}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Postal Code:</label>
        <input
          className={styles.input}
          type="text"
          name="postalCode"
          value={values.postalCode}
          onChange={(e) => handleChange(e, values['country'])}
        />
        {errors.postalCode && <span className={styles.error}>{errors.postalCode}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>City:</label>
        <input
          className={styles.input}
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
        />
        {errors.city && <span className={styles.error}>{errors.city}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Street:</label>
        <input
          className={styles.input}
          type="text"
          name="street"
          value={values.street}
          onChange={handleChange}
        />
        {errors.street && <span className={styles.error}>{errors.street}</span>}
      </div>
      <button
        type="submit"
        disabled={
          Object.values(errors).some((error) => error !== undefined) ||
          Object.keys(values).some((key) => key !== 'country' && values[key] === '')
        }
        className={styles.submitButton}
      >
        Signup
      </button>
    </form>
  );
};

export default RegistrationForm;
