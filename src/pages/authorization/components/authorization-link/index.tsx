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
      <a href={hrefValue}>{title}</a>
    </li>
  );
};

export default AuthorizationLink;
