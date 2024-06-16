import { Link } from 'react-router-dom';
import styles from './main.module.css';
import cn from 'classnames';
import { Routes } from '@/utils/const';

function Main() {
  return (
    <div className={cn('container', styles.main)}>
      <ul>
        <li className={styles.navItem}>
          <Link className={styles.link} to={Routes.CATALOG}>
            <i className={cn(styles.icon, styles.coursesIcon)}></i>
            Catalog
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to={Routes.ABOUT}>
            About us
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to={Routes.CART}>
            <i className={cn(styles.icon, styles.basketIcon)}></i>
            Basket
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to={Routes.LOGIN}>
            <i className={cn(styles.icon, styles.loginIcon)}></i>
            Login
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to={Routes.SIGNUP}>
            <i className={cn(styles.icon, styles.signupIcon)}></i>
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Main;
