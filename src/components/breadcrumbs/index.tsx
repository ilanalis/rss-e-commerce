import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { CategoryMap } from '@/utils/const';

type BreadcrumbsProps = {
  categoryId:
    | 'c96ff3d0-1688-4913-90ae-a3056e259e68'
    | '78db1a69-6023-44b5-8b3d-a8f294cdd335'
    | 'dac8edad-bf16-4f56-859c-f364efde1c2a'
    | '9f44fc3d-b2b9-4625-91e8-03934154b07d';
};

function Breadcrumbs({ categoryId }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.link} to={'/catalog'}>
        Catalog
      </Link>
      /<span>{CategoryMap[categoryId]}</span>
    </div>
  );
}

export default Breadcrumbs;
