import styles from './style.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { getUserInfo } from '@/utils/api/commercetools-api';
import { Customer } from '@commercetools/platform-sdk';
import PersonalInfo from './PersonalInfo';
import AddressesInfo from './AddressesInfo';
import ChangePassword from './ChangePassword';

type Page = 'personalInfo' | 'addresses' | 'changePassword';

const Profile: FC = () => {
  const { apiRoot } = useApiRootContext();
  const [activePage, setActivePage] = useState<Page>('personalInfo');
  const [userInfo, setUserInfo] = useState<Customer | null>(null);

  const renderPage = () => {
    switch (activePage) {
      case 'personalInfo':
        return (
          <PersonalInfo
            email={userInfo?.email}
            firstName={userInfo?.firstName}
            lastName={userInfo?.lastName}
            dateOfBirth={userInfo?.dateOfBirth}
          />
        );
      case 'addresses':
        return (
          <AddressesInfo
            addresses={userInfo?.addresses ? userInfo?.addresses : []}
            defaultShippingAddress={userInfo?.defaultShippingAddressId}
            defaultBillingAddress={userInfo?.defaultBillingAddressId}
          />
        );
      case 'changePassword':
        return <ChangePassword />;
      default:
        return (
          <PersonalInfo
            email={userInfo?.email}
            firstName={userInfo?.firstName}
            lastName={userInfo?.lastName}
            dateOfBirth={userInfo?.dateOfBirth}
          />
        );
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (apiRoot) {
        const data = await getUserInfo(apiRoot);
        if (data) setUserInfo(data);
      }
    };
    fetchUserInfo();
  }, [apiRoot]);

  return (
    <div className={cn('container', styles.profileContainer)}>
      <div className={styles.navBlock}>
        <nav className={styles.nav}>
          <button
            className={
              activePage === 'personalInfo' ? cn(styles.navItem, styles.active) : styles.navItem
            }
            onClick={() => setActivePage('personalInfo')}
          >
            Personal information
          </button>
          <button
            className={
              activePage === 'addresses' ? cn(styles.navItem, styles.active) : styles.navItem
            }
            onClick={() => setActivePage('addresses')}
          >
            Addresses
          </button>
          <button
            className={
              activePage === 'changePassword' ? cn(styles.navItem, styles.active) : styles.navItem
            }
            onClick={() => setActivePage('changePassword')}
          >
            Change Password
          </button>
        </nav>
      </div>
      <div className={styles.contentBlock}>{renderPage()}</div>
    </div>
  );
};

export default Profile;
