import cn from 'classnames';
import styles from './style.module.css';
import { Address, Customer } from '@commercetools/platform-sdk';
import { FC, useState } from 'react';
import AddressItem from './AddressItem';

interface AddressInfoProps {
  addresses: Address[];
  defaultBillingAddress: string | undefined;
  defaultShippingAddress: string | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const AddressesInfo: FC<AddressInfoProps> = ({
  addresses,
  defaultBillingAddress = undefined,
  defaultShippingAddress = undefined,
  setUserInfo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
    document.body.classList.toggle('lock');
  }

  return (
    <>
      <button className={cn(styles.btn, styles.openModalBtn)} onClick={openModal}>
        Add new address
      </button>

      {addresses.map((addressData) => {
        return (
          <AddressItem
            key={addressData.id}
            addressId={addressData.id}
            address={addressData}
            isDefaultShipping={defaultShippingAddress === addressData.id}
            isDefaultBilling={defaultBillingAddress === addressData.id}
            setUserInfo={setUserInfo}
          />
        );
      })}
      {isModalOpen ? (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <AddressItem
              isAddNewAddressMode={true}
              setIsModalOpen={setIsModalOpen}
              setUserInfo={setUserInfo}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddressesInfo;
