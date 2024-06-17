import { Link } from 'react-router-dom';
import styles from './style.module.css';

type CatalogCardProps = {
  title: string;
  imgPath: string;
  route: string;
};

function CatalogCard({ title, imgPath, route }: CatalogCardProps) {
  return (
    <Link className={styles.card} to={route}>
      <img className={styles.img} src={imgPath} alt={`${title} image`} />
      {title}
    </Link>
  );
}

export default CatalogCard;
