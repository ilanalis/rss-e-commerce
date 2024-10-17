import styles from './style.module.css';
import cn from 'classnames';
import RSSLogo from '@assets/rss-logo.png';

import { FC } from 'react';

import MemberCard from './components/member-card';
import { collaborationList, membersData } from './config';

const AboutUs: FC = () => {
  return (
    <section className={cn('container', styles.aboutUsContainer)}>
      <div className={styles.introContainer}>
        <h2 className={styles.title}>Hi, we are the DigitalDreamSquad!</h2>
      </div>
      <div className={styles.membersContainer}>
        {membersData.map((memberData, ind) => {
          return <MemberCard key={ind} {...memberData} />;
        })}
      </div>
      <h2 className={styles.heading2}>Collaboration:</h2>

      <ul className={styles.collaborationContainer}>
        {collaborationList.map((collaboration, ind) => {
          return (
            <li className={styles.collaborationItem} key={ind}>
              <h3 className={styles.collaborationTitle}>{collaboration.title}</h3>
              <p className={styles.description}>{collaboration.description}</p>
            </li>
          );
        })}
      </ul>
      <div className={styles.schoolInfoBlock}>
        <div className={styles.schoolInfoText}>
          <h2 className={styles.heading2}>The Rolling Scopes School</h2>
          <p className={styles.description}>
            The project was implemented during the studying at the Rolling Scopes Frontend Course
          </p>
        </div>
        <a
          className={styles.rssLink}
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.rssLogo} src={RSSLogo} alt="" />
        </a>
      </div>
    </section>
  );
};

export default AboutUs;
