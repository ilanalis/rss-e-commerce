import styles from './style.module.css';
import cn from 'classnames';

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
        <h2 className={styles.collaborationHeading}>Collaboration:</h2>
        {collaborationList.map((collaboration, ind) => {
          return (
            <li className={styles.collaborationItem} key={ind}>
              <h3 className={styles.collaborationTitle}>&#x1F680;{collaboration.title}</h3>
              <p className={styles.collaborationDescription}>{collaboration.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AboutUs;
