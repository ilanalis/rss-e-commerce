import styles from '@pages/authorization/style.module.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { MyCustomerDraft } from '@commercetools/platform-sdk';

import { useApiRootContext } from '@contexts/useApiRootContext';
import { useUserContext } from '@contexts/useUserContext';

import { register } from '@utils/api/commercetools-api';
import notify from '@utils/notify';

import useFormValidation, { FormState } from '@pages/authorization/useFormValidation';
import { getValidationRules } from '@pages/authorization/validationRules';
import PasswordInput from '@pages/authorization/components/password-input/';
import {
  COUNTRY_OPTIONS,
  initialRegistrationData,
  inputNames,
} from '@/pages/authorization/forms-config';
import InputField from '@pages/authorization/components/input-field';
import SelectField from '@pages/authorization/components/select-field';

const RegistrationForm: FC = () => {
  const initialState: FormState = initialRegistrationData;

  const { values, errors, handleChange, changeValues, validateValue, isFormValid } =
    useFormValidation(initialState, getValidationRules(Object.keys(initialState)));
  const { apiRoot, setApiRoot } = useApiRootContext();
  const { setIsUserLoggedIn } = useUserContext();

  async function registerUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, firstName, lastName, dateOfBirth, country, city, street, postalCode } =
      values;
    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [
        {
          country,
          city,
          streetName: street,
          postalCode,
        },
      ],
    };

    const form = e.target;
    if (form instanceof HTMLFormElement) {
      const defaultShippingInput = form.elements[inputNames.defaultShipping];

      if (defaultShippingInput instanceof HTMLInputElement) {
        console.log(defaultShippingInput.checked);
      }
    }

    if (apiRoot) {
      const response = await register(apiRoot, customerDraft);

      if (response.success && response.apiBuilder) {
        setApiRoot(response.apiBuilder);
        setIsUserLoggedIn(true);
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    }
  }

  const setBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValues = {
        billingCountry: values.shippingCountry,
        billingPostalCode: values.shippingPostalCode,
        billingCity: values.shippingCity,
        billingStreet: values.shippingStreet,
      };
      changeValues(newValues, values.shippingCountry);
    }
  };

  const changePostalCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    let postalCodeName = inputNames.shippingPostalCode;
    if (name === inputNames.billingCountry) {
      postalCodeName = inputNames.billingPostalCode;
    }

    changeValues({ [name]: value });
    validateValue(postalCodeName, values[postalCodeName], value);
  };

  return (
    <form className={styles.formContainer} onSubmit={registerUser}>
      <InputField
        labelTitle="Email"
        name={inputNames.email}
        type="text"
        value={values[inputNames.email]}
        onChange={handleChange}
        error={errors[inputNames.email]}
        autoComplete={`user-${inputNames.email}`}
      />
      <div className={styles.fieldContainer}>
        <label>Password:</label>
        <PasswordInput
          name={inputNames.password}
          value={values[inputNames.password]}
          onChange={handleChange}
        />
        {errors[inputNames.password] && (
          <span className={styles.error}>{errors[inputNames.password]}</span>
        )}
      </div>
      <InputField
        labelTitle="First Name"
        type="text"
        name={inputNames.firstName}
        value={values[inputNames.firstName]}
        onChange={handleChange}
        error={errors[inputNames.firstName]}
        autoComplete={`user-${inputNames.firstName}`}
      />
      <InputField
        labelTitle="Last Name"
        type="text"
        name={inputNames.lastName}
        value={values[inputNames.lastName]}
        onChange={handleChange}
        error={errors[inputNames.lastName]}
        autoComplete={`user-${inputNames.lastName}`}
      />
      <InputField
        labelTitle="Date of Birth"
        type="date"
        name={inputNames.dateOfBirth}
        value={values[inputNames.dateOfBirth]}
        onChange={handleChange}
        error={errors[inputNames.dateOfBirth]}
        autoComplete={`user-${inputNames.dateOfBirth}`}
      />

      <fieldset>
        <legend>Shipping Address</legend>
        <SelectField
          labelTitle="Country:"
          name={inputNames.shippingCountry}
          options={COUNTRY_OPTIONS}
          value={values[inputNames.shippingCountry]}
          onChange={changePostalCode}
          error={errors[inputNames.shippingCountry]}
        />
        <InputField
          labelTitle="Postal Code"
          type="text"
          name={inputNames.shippingPostalCode}
          value={values[inputNames.shippingPostalCode]}
          onChange={(e) => handleChange(e, values[inputNames.shippingCountry])}
          error={errors[inputNames.shippingPostalCode]}
        />
        <InputField
          labelTitle="City"
          type="text"
          name={inputNames.shippingCity}
          value={values[inputNames.shippingCity]}
          onChange={handleChange}
          error={errors[inputNames.shippingCity]}
        />
        <InputField
          labelTitle="Street"
          type="text"
          name={inputNames.shippingStreet}
          value={values[inputNames.shippingStreet]}
          onChange={handleChange}
          error={errors[inputNames.shippingStreet]}
        />
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={inputNames.billingAddress}
            name={inputNames.billingAddress}
            onChange={setBillingAddress}
          />
          <label htmlFor={inputNames.billingAddress}>Set as billing address</label>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={inputNames.defaultShipping}
            name={inputNames.defaultShipping}
          />
          <label htmlFor={inputNames.defaultShipping}>Set as default address</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Billing Address</legend>
        <SelectField
          labelTitle="Country:"
          name={inputNames.billingCountry}
          options={COUNTRY_OPTIONS}
          value={values[inputNames.billingCountry]}
          onChange={changePostalCode}
          error={errors[inputNames.billingCountry]}
        />
        <InputField
          labelTitle="Postal Code"
          type="text"
          name={inputNames.billingPostalCode}
          value={values[inputNames.billingPostalCode]}
          onChange={(e) => handleChange(e, values[inputNames.billingCountry])}
          error={errors[inputNames.billingPostalCode]}
        />
        <InputField
          labelTitle="City"
          type="text"
          name={inputNames.billingCity}
          value={values[inputNames.billingCity]}
          onChange={handleChange}
          error={errors[inputNames.billingCity]}
        />
        <InputField
          labelTitle="Street"
          type="text"
          name={inputNames.billingStreet}
          value={values[inputNames.billingStreet]}
          onChange={handleChange}
          error={errors[inputNames.billingStreet]}
        />
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id={inputNames.defaultBilling} name={inputNames.defaultBilling} />
          <label htmlFor={inputNames.defaultBilling}>Set as default address</label>
        </div>
      </fieldset>

      <button type="submit" disabled={!isFormValid()} className={styles.submitButton}>
        Signup
      </button>
      <ToastContainer position="bottom-right" />
    </form>
  );
};

export default RegistrationForm;
