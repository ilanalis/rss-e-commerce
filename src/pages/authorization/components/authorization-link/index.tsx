import { Link } from 'react-router-dom';
import styles from './style.module.css';

import { FC } from 'react';

export interface AuthorizationLinkProps {
  title: string;
  hrefValue: string;
}

const AuthorizationLink: FC<AuthorizationLinkProps> = ({
  title,
  hrefValue,
}: AuthorizationLinkProps) => {
  return (
    <li className={styles.linkContainer}>
      <Link className={styles.link} to={hrefValue}>
        {title}
      </Link>
    </li>
  );
};

export default AuthorizationLink;
