import styles from './logo.module.css';
import cn from 'classnames';

type LogoProps = {
  theme: 'dark' | 'light';
};

function Logo({ theme }: LogoProps) {
  return (
    <a className={cn(styles.logo, styles[theme])} href="/">
      <i className={styles.logoIcon}></i>
      <p className={styles.title}>SkillSpot</p>
    </a>
  );
}

export default Logo;
