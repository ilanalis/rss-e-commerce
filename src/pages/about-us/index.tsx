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
        <p className={styles.motto}>
          Three students, one dream. We&apos;re on the verge of completing our course, armed with
          passion and creativity &#x1F607;&#x1F60D;&#x1F64C;
        </p>
      </div>
      <div className={styles.membersContainer}>
        {membersData.map((memberData, ind) => {
          return <MemberCard key={ind} {...memberData} />;
        })}
      </div>
      <ul className={styles.collaborationContainer}>
        <h2 className={styles.heading2}>Collaboration:</h2>
        {collaborationList.map((collaboration, ind) => {
          return (
            <li className={styles.collaborationItem} key={ind}>
              <h3 className={styles.collaborationTitle}>&#x1F680;{collaboration.title}</h3>
              <p className={styles.description}>{collaboration.description}</p>
            </li>
          );
        })}
      </ul>
      <h2 className={styles.heading2}>The Rolling Scopes School</h2>
      <a
        className={styles.rssLink}
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles.rssLogo} src={RSSLogo} alt="" />
      </a>
      <p className={styles.description}>
        The project was implemented during the studying at the Rolling Scopes Frontend Course
      </p>
    </section>
  );
};

export default AboutUs;
