import cn from 'classnames';
import { Address, BaseAddress, Customer } from '@commercetools/platform-sdk';
import InputField from '../authorization/components/input-field';
import SelectField from '../authorization/components/select-field';
import { COUNTRY_OPTIONS, inputNames } from '../authorization/forms-config';
import useFormValidation from '../authorization/useFormValidation';
import { getValidationRules } from '../authorization/validationRules';
import styles from './style.module.css';
import { FC, useEffect, useState } from 'react';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import saveIcon from '../../assets/save.png';
import closeIcon from '../../assets/close.png';
import {
  addNewAddress,
  changeAddress,
  deleteAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
} from '@/utils/api/user-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import notify from '@/utils/notify';
import { getUserInfo } from '@/utils/api/commercetools-api';

interface AddressItemProps {
  setUserInfo: React.Dispatch<React.SetStateAction<Customer | null>>;
  address?: Address;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  addressId?: string | undefined;
  isAddNewAddressMode?: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressItem: FC<AddressItemProps> = ({
  address,
  isDefaultShipping,
  isDefaultBilling,
  addressId,
  isAddNewAddressMode,
  setIsModalOpen,
  setUserInfo,
}) => {
  const [isEdit, setIsEdit] = useState(isAddNewAddressMode);
  const [localIsDefaultShipping, setLocalIsDefaultShipping] = useState(isDefaultShipping);
  const [localIsDefaultBilling, setLocalIsDefaultBilling] = useState(isDefaultBilling);
  const { apiRoot } = useApiRootContext();

  const initialState = {
    billingCountry: 'US',
    billingCity: '',
    billingStreet: '',
    billingPostalCode: '',
  };
  const { values, errors, handleChange, changeValues, validateValue, isFormValid } =
    useFormValidation(initialState, getValidationRules(Object.keys(initialState)));

  useEffect(() => {
    if (address && address.country && address.city && address.streetName && address.postalCode) {
      const newValues = {
        billingCountry: address.country,
        billingCity: address.city,
        billingStreet: address.streetName,
        billingPostalCode: address.postalCode,
      };
      changeValues(newValues, address.country);
    }
    setLocalIsDefaultShipping(isDefaultShipping);
    setLocalIsDefaultBilling(isDefaultBilling);
  }, [isDefaultBilling, isDefaultShipping, changeValues, address]);

  const changePostalCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let postalCodeName = inputNames.shippingPostalCode;

    if (name === inputNames.billingCountry) {
      postalCodeName = inputNames.billingPostalCode;
    }

    changeValues({ [name]: value });
    validateValue(postalCodeName, values[postalCodeName], value);
  };

  async function deleteCurrentAddress() {
    if (apiRoot && addressId) {
      const response = await deleteAddress(apiRoot, addressId);

      if (response.success) {
        notify('address successful deleted');
        const fetchUserInfo = async () => {
          if (apiRoot) {
            const data = await getUserInfo(apiRoot);
            if (data) setUserInfo(data);
          }
        };
        fetchUserInfo();
        setIsEdit(false);
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    }
  }

  function close() {
    if (isAddNewAddressMode && setIsModalOpen) {
      setIsModalOpen(false);
      document.body.classList.toggle('lock');
    } else {
      setIsEdit(false);
    }
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!apiRoot || !isEdit) return;

    const addressObject: BaseAddress = {
      country: values.billingCountry,
      city: values.billingCity,
      streetName: values.billingStreet,
      postalCode: values.billingPostalCode,
    };

    const form = e.target as HTMLFormElement;
    const defaultShippingInput = form.elements[inputNames.defaultShipping] as HTMLInputElement;
    const defaultBillingInput = form.elements[inputNames.defaultBilling] as HTMLInputElement;

    const fetchUserInfo = async () => {
      const data = await getUserInfo(apiRoot);
      if (data) setUserInfo(data);
    };

    const handleDefaultAddress = async () => {
      if (defaultShippingInput.checked || defaultBillingInput.checked) {
        if (defaultShippingInput.checked) {
          const shippingResponse = await setDefaultShippingAddress(apiRoot, addressId);
          if (!shippingResponse.success) {
            console.log('Failed to set default shipping address:', shippingResponse.errorMessage);
          }
          if (defaultBillingInput.checked) {
            await setDefaultBillingAddress(apiRoot, addressId);
          }
        } else if (defaultBillingInput.checked) {
          await setDefaultBillingAddress(apiRoot, addressId);
        }
      }
    };

    const handleSuccessResponse = async (response: { success: boolean; errorMessage?: string }) => {
      if (response.success) {
        await handleDefaultAddress();
        await fetchUserInfo();
        setIsEdit(false);
        notify(
          isAddNewAddressMode ? 'Address successfully created' : 'Address successfully updated',
        );
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    };

    if (isAddNewAddressMode && setIsModalOpen) {
      setIsModalOpen(false);
      document.body.classList.remove('lock');
      const response = await addNewAddress(apiRoot, addressObject);
      await handleSuccessResponse(response);
    } else if (addressId) {
      document.body.classList.remove('lock');
      const response = await changeAddress(apiRoot, addressId, addressObject);
      await handleSuccessResponse(response);
    }
  }

  return (
    <div className={styles.address}>
      <form onSubmit={save}>
        <SelectField
          labelTitle="Country:"
          name={inputNames.billingCountry}
          options={COUNTRY_OPTIONS}
          value={values[inputNames.billingCountry]}
          onChange={changePostalCode}
          error={errors[inputNames.billingCountry]}
          styles={styles}
          isDisabled={!isEdit}
        />
        <InputField
          labelTitle="Postal Code"
          type="text"
          name={inputNames.billingPostalCode}
          value={values[inputNames.billingPostalCode]}
          onChange={(e) => handleChange(e, values[inputNames.billingCountry])}
          error={errors[inputNames.billingPostalCode]}
          styles={styles}
          isDisabled={!isEdit}
        />
        <InputField
          labelTitle="City"
          type="text"
          name={inputNames.billingCity}
          value={values[inputNames.billingCity]}
          onChange={handleChange}
          error={errors[inputNames.billingCity]}
          styles={styles}
          isDisabled={!isEdit}
        />
        <InputField
          labelTitle="Street"
          type="text"
          name={inputNames.billingStreet}
          value={values[inputNames.billingStreet]}
          onChange={handleChange}
          error={errors[inputNames.billingStreet]}
          styles={styles}
          isDisabled={!isEdit}
        />
        <div className={styles.checkboxContainer}>
          <div>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              id={`${inputNames.defaultShipping}-${addressId}`}
              name={inputNames.defaultShipping}
              checked={localIsDefaultShipping}
              disabled={!isEdit}
              onChange={() => setLocalIsDefaultShipping(!localIsDefaultShipping)}
            />
            <label
              className={styles.checkboxLabel}
              htmlFor={`${inputNames.defaultShipping}-${addressId}`}
            >
              Set as default shipping address
            </label>
          </div>
          <div>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              id={`${inputNames.defaultBilling}-${addressId}`}
              name={inputNames.defaultBilling}
              checked={localIsDefaultBilling}
              disabled={!isEdit}
              onChange={() => setLocalIsDefaultBilling(!localIsDefaultBilling)}
            />
            <label
              className={styles.checkboxLabel}
              htmlFor={`${inputNames.defaultBilling}-${addressId}`}
            >
              Set as default billing address
            </label>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {!isEdit ? (
            <button
              className={cn(styles.btn, styles.addressButton)}
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
              type="button"
            >
              <img className={styles.icon} src={editIcon} alt="" />
            </button>
          ) : (
            <button
              className={cn(styles.btn, styles.addressButton)}
              disabled={!isFormValid()}
              type="submit"
            >
              <img src={saveIcon} alt="" className={styles.icon} />
            </button>
          )}

          {!isAddNewAddressMode ? (
            <button
              type="button"
              className={cn(styles.btn, styles.addressButton)}
              onClick={deleteCurrentAddress}
            >
              <img src={deleteIcon} className={styles.icon} alt="" />
            </button>
          ) : null}

          {isEdit ? (
            <button type="button" className={cn(styles.btn, styles.addressButton)} onClick={close}>
              <img src={closeIcon} alt="" className={styles.icon} />
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default AddressItem;
