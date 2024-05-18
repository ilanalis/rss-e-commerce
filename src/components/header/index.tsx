import { useState } from 'react';
import styles from './header.module.css';
import Logo from '@components/logo/';
import cn from 'classnames';

type HeaderProps = {
  isAuth: boolean;
  theme: 'light' | 'dark';
};

function Header({ isAuth, theme }: HeaderProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className={cn(styles.header, styles[theme])}>
      <div className={`container ${styles.header__container}`}>
        <Logo theme={theme} />
        <nav className={cn(styles.header__nav, { [styles.active]: isOpen })}>
          <ul className={cn(styles.header__navList, styles.header__siteNav)}>
            <li className={styles.header__navItem}>
              <a className={styles.siteNav__link} href="#main">
                <i className={cn(styles.icon, styles.coursesIcon)}></i>
                Courses
              </a>
            </li>
            <li className={styles.header__navItem}>
              <a href="#about">About us</a>
            </li>
          </ul>
          <ul className={cn(styles.header__navList, styles.header__userNav)}>
            <li className={styles.header__navItem}>
              <a className={styles.userNav__link} href="#busket">
                <i className={cn(styles.icon, styles.basketIcon)}></i>
                Basket
              </a>
            </li>
            {isAuth ? (
              <>
                <li className={styles.header__navItem}>
                  <a className={styles.userNav__link} href="#profile">
                    <i className={cn(styles.icon, styles.profileIcon)}></i>
                    Profile
                  </a>{' '}
                </li>
                <li className={styles.header__navItem}>
                  <button className={cn(styles.logoutButton, styles.userNav__link)}>
                    <i className={cn(styles.icon, styles.logoutIcon)}></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.header__navItem}>
                  <a className={styles.userNav__link} href="#login">
                    <i className={cn(styles.icon, styles.loginIcon)}></i>
                    Login
                  </a>
                </li>
                <li className={styles.header__navItem}>
                  <a className={styles.userNav__link} href="#signup">
                    <i className={cn(styles.icon, styles.signupIcon)}></i>
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
        <button
          className={cn(styles.header__menuButton, { [styles.open]: isOpen })}
          onClick={() => setOpen(!isOpen)}
        >
          <div className={styles.strip}></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
