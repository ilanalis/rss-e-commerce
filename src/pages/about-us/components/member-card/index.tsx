import styles from './style.module.css';

import { FC } from 'react';

import GithubLogo from '@assets/github-mark.svg';

export interface MemberCardProps {
  title: string;
  link: string;
  role: string;
  imgSrc: string;
  bio: string;
  contributionList: string[];
}

const MemberCard: FC<MemberCardProps> = ({ title, link, role, imgSrc, bio, contributionList }) => {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={imgSrc} alt="" />
      </div>
      <header className={styles.headerContainer}>
        <h2 className={styles.title}>{title}</h2>
        <a className={styles.iconLink} href={link} target="_blank" rel="noopener noreferrer">
          <img className={styles.iconLink__image} src={GithubLogo} alt="" />
        </a>
      </header>
      <h3 className={styles.role}>{role}</h3>
      <p className={styles.text}>{bio}</p>
      <ol className={styles.contributionContainer}>
        <span className={styles.contributionTitle}>Contribution:</span>
        {contributionList.map((contribution, ind) => {
          return <li key={ind}>&#x1F31F; {contribution}</li>;
        })}
      </ol>
    </article>
  );
};

export default MemberCard;
