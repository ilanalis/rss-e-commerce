import styles from './not-found.module.css';
import owlImg from '../../assets/owl.svg';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={`container ${styles.contentWrapper}`}>
        <img className={styles.owl} src={owlImg} alt="Owl" />
        <p className={styles.text}>
          <span className={styles.status}>404</span>
          <br />
          Page not found
        </p>
      </div>
      <a className={styles.link} href="/">
        To main
      </a>
    </div>
  );
}

export default NotFound;
