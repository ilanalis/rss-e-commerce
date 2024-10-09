import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { CategoryMap } from '@/utils/const';

type BreadcrumbsProps = {
  categoryId:
    | 'a217802e-37e8-4e30-aeb4-69e1197a12b5'
    | '5e12f1b9-406c-4719-8cc9-af131511e2d9'
    | '2bcab347-1ebf-45d9-b643-6cfaf2b33508'
    | '634d7e9e-b05d-4b9f-9ead-5bf8f6c711d7';
};

function Breadcrumbs({ categoryId }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.link} to={'/catalog'}>
        Catalog
      </Link>
      <span>/ {CategoryMap[categoryId]}</span>
    </div>
  );
}

export default Breadcrumbs;
