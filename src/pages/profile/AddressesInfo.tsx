import InputField from '../authorization/components/input-field';
import SelectField from '../authorization/components/select-field';
import { COUNTRY_OPTIONS, inputNames } from '../authorization/forms-config';
import useFormValidation from '../authorization/useFormValidation';
import { getValidationRules } from '../authorization/validationRules';
import styles from './style.module.css';
import { FC } from 'react';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import cn from 'classnames';
import { Address } from '@commercetools/platform-sdk';

interface AddressInfoProps {
  addresses: Address[];
  defaultBillingAddress: string | undefined;
  defaultShippingAddress: string | undefined;
}

const AddressesInfo: FC<AddressInfoProps> = ({
  addresses,
  defaultBillingAddress = undefined,
  defaultShippingAddress = undefined,
}) => {
  return addresses.map((addressData) => {
    return (
      <AddressItem
        key={addressData.id}
        address={addressData}
        isDefaultShipping={defaultShippingAddress === addressData.id}
        isDefaultBilling={defaultBillingAddress === addressData.id}
      />
    );
  });
};
const AddressItem: FC<{
  address: Address;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}> = ({ address, isDefaultShipping, isDefaultBilling }) => {
  const initialState = {
    billingCountry: '',
    billingCity: '',
    billingStreet: '',
    billingPostalCode: '',
  };
  if (address.country && address.city && address.streetName && address.postalCode) {
    initialState.billingCountry = address.country;
    initialState.billingCity = address.city;
    initialState.billingStreet = address.streetName;
    initialState.billingPostalCode = address.postalCode;
  }

  const { values, errors, handleChange, changeValues, validateValue } = useFormValidation(
    initialState,
    getValidationRules(Object.keys(initialState)),
  );

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
    <div className={styles.address}>
      <form onSubmit={(e) => e.preventDefault()}>
        <SelectField
          labelTitle="Country:"
          name={inputNames.billingCountry}
          options={COUNTRY_OPTIONS}
          value={values[inputNames.billingCountry]}
          onChange={changePostalCode}
          error={errors[inputNames.billingCountry]}
          styles={styles}
        />
        <InputField
          labelTitle="Postal Code"
          type="text"
          name={inputNames.billingPostalCode}
          value={values[inputNames.billingPostalCode]}
          onChange={(e) => handleChange(e, values[inputNames.billingCountry])}
          error={errors[inputNames.billingPostalCode]}
          styles={styles}
        />
        <InputField
          labelTitle="City"
          type="text"
          name={inputNames.billingCity}
          value={values[inputNames.billingCity]}
          onChange={handleChange}
          error={errors[inputNames.billingCity]}
          styles={styles}
        />
        <InputField
          labelTitle="Street"
          type="text"
          name={inputNames.billingStreet}
          value={values[inputNames.billingStreet]}
          onChange={handleChange}
          error={errors[inputNames.billingStreet]}
          styles={styles}
        />
        <div className={styles.checkboxContainer}>
          <div>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              id={inputNames.defaultShipping}
              name={inputNames.defaultShipping}
              defaultChecked={isDefaultShipping}
            />
            <label className={styles.checkboxLabel} htmlFor={inputNames.defaultShipping}>
              Set as default shipping address
            </label>
          </div>
          <div>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              id={inputNames.defaultBilling}
              name={inputNames.defaultBilling}
              defaultChecked={isDefaultBilling}
            />
            <label className={styles.checkboxLabel} htmlFor={inputNames.defaultBilling}>
              Set as default billing address
            </label>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={cn(styles.btn, styles.addressButton)} type="submit">
            <img className={styles.icon} src={editIcon} alt="" />
          </button>
          <button className={cn(styles.btn, styles.addressButton)}>
            <img className={styles.icon} src={deleteIcon} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressesInfo;
