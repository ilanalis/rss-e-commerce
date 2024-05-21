import { FC } from 'react';
import Header from '../header';
import { Outlet } from 'react-router-dom';
import styles from './style.module.css';
import cn from 'classnames';
import AuthorizationLink from '@/pages/authorization/components/authorization-link';

const AuthLayout: FC = () => {
  return (
    <>
      <Header theme="dark" />
      <div className={cn('container', styles.authorizationContainer)}>
        <nav className={styles.navContainer}>
          <ul className={styles.nav}>
            <AuthorizationLink title={'Login'} hrefValue="/login" />
            <AuthorizationLink title={'Sign-up'} hrefValue="/signup" />
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
