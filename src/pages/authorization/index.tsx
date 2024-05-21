import styles from './style.module.css';
import cn from 'classnames';

import { FC } from 'react';

import AuthorizationLink from '@/pages/authorization/components/nav-link';
import RegistrationForm from '@/pages/authorization/registration/';

const Authorization: FC = () => {
  return (
    <div className={cn('container', styles.authorizationContainer)}>
      <nav className={styles.navContainer}>
        <ul className={styles.nav}>
          <AuthorizationLink title={'Login'} hrefValue="#login" />
          <AuthorizationLink title={'Sign-up'} hrefValue="#signup" />
        </ul>
      </nav>
      <RegistrationForm />
    </div>
  );
};

export default Authorization;
