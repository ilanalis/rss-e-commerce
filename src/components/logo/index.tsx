import { Link } from 'react-router-dom';
import styles from './logo.module.css';
import cn from 'classnames';
import { Routes } from '@/utils/const';

type LogoProps = {
  theme: 'dark' | 'light';
};

function Logo({ theme }: LogoProps) {
  return (
    <Link className={cn(styles.logo, styles[theme])} to={Routes.MAIN}>
      <i className={styles.logoIcon}></i>
      <p className={styles.title}>SkillSpot</p>
    </Link>
  );
}

export default Logo;
