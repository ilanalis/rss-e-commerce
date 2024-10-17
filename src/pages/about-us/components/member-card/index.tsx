import styles from './style.module.css';

import { FC } from 'react';

import GithubLogo from '@assets/github-mark.svg';

export interface MemberCardProps {
  title: string;
  link: string;
  role: string;
  imgSrc: string;
  contributionList: string[];
}

const MemberCard: FC<MemberCardProps> = ({ title, link, role, imgSrc, contributionList }) => {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarOverlay}></div>
        <img className={styles.avatar} src={imgSrc} alt="" />
      </div>
      <header className={styles.headerContainer}>
        <h2 className={styles.title}>{title}</h2>
        <a className={styles.iconLink} href={link} target="_blank" rel="noopener noreferrer">
          <img className={styles.iconLink__image} src={GithubLogo} alt="" />
        </a>
      </header>
      <h3 className={styles.role}>{role}</h3>
      <span className={styles.contributionTitle}>Contributions:</span>
      <ul className={styles.contributionContainer}>
        {contributionList.map((contribution, ind) => {
          return <li key={ind}>{contribution}</li>;
        })}
      </ul>
    </article>
  );
};

export default MemberCard;
