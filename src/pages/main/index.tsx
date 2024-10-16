import styles from './main.module.css';
import cn from 'classnames';
import { discountCodes } from './config';
import descrImg1 from '@assets/descr-1.png';
import descrImg2 from '@assets/descr-2.png';

function Main() {
  return (
    <div className={cn('container', styles.main)}>
      <div className={styles.discountCodesBlock}>
        {discountCodes.map((discount) => (
          <div key={discount.code} className={styles.discountBorderWrapper}>
            <div className={styles.discount}>
              <p>Get this discount!</p>
              <p>
                Enter the code <span className={styles.discountCode}>{discount.code} </span>in your
                cart and get <span className={styles.discountSize}>{discount.discount}</span> off
                your order!
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.about}>
        <h1 className={styles.header}>Welcome to our online course store!</h1>
        <div className={styles.descriptionBlock}>
          <p className={styles.text}>
            Our online store offers a wide selection of courses on various topics, from programming
            and design to marketing and personal development. We bring together{' '}
            <b className={styles.highlightedTextBlue}>top instructors</b> and
            <b className={styles.highlightedTextBlue}> high-quality educational materials</b> to
            provide you with affordable and convenient learning anytime, anywhere. Each course is
            designed with <b className={styles.highlightedTextBlue}>modern trends</b> and
            <b className={styles.highlightedTextBlue}>practical skills</b> in mind, helping you
            succeed in your chosen field.
          </p>
          <div className={styles.imgWrapper}>
            <img src={descrImg1} alt="" />
          </div>
        </div>
        <div className={styles.descriptionBlock}>
          <div className={cn(styles.imgWrapper, styles.imgWrapper2)}>
            <img src={descrImg2} alt="" />
          </div>
          <p className={styles.text}>
            <h2 className={styles.subtitle}>
              Why choose <b className={styles.highlightedTextBlue}>us</b>:
            </h2>
            <ul className={styles.criteriaList}>
              <li>
                <b className={styles.highlightedTextBlue}>Wide variety of courses:</b> A diverse
                range of subjects and learning paths for all skill levels.
              </li>
              <li>
                <b className={styles.highlightedTextBlue}>Flexible format:</b> Learn online at your
                own pace with 24/7 access to course materials.
              </li>
              <li>
                <b className={styles.highlightedTextBlue}>Practical focus:</b> Emphasis on
                real-world tasks and case studies for better knowledge retention.
              </li>
              <li>
                <b className={styles.highlightedTextBlue}>Constantly updated content:</b> We
                regularly add new courses to keep you up-to-date with the latest trends.
              </li>
            </ul>
          </p>
        </div>
      </div>{' '}
    </div>
  );
}

export default Main;
