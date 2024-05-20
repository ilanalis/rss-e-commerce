import { Link } from 'react-router-dom';
import styles from './main.module.css';
import cn from 'classnames';

function Main() {
  return (
    <div className={cn('container', styles.main)}>
      <ul>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/courses">
            <i className={cn(styles.icon, styles.coursesIcon)}></i>
            Courses
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/about">
            About us
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/cart">
            <i className={cn(styles.icon, styles.basketIcon)}></i>
            Basket
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/login">
            <i className={cn(styles.icon, styles.loginIcon)}></i>
            Login
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/sign-up">
            <i className={cn(styles.icon, styles.signupIcon)}></i>
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Main;
