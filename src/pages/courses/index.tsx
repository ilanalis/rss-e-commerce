import CatalogCard from '@/components/catalog-card';
import { Routes } from '@/utils/const';
import styles from './style.module.css';
import imgProgramming from '@/assets/programming.png';
import imgDesign from '@/assets/design.svg';
import imgMarketing from '@/assets/marketing.png';
import imgBusiness from '@/assets/business.png';

function Courses() {
  return (
    <div className={styles.catalog}>
      <CatalogCard
        title="Programming"
        imgPath={imgProgramming}
        route={Routes.PROGRAMMING}
      ></CatalogCard>

      <CatalogCard title="Design" imgPath={imgDesign} route={Routes.DESIGN}></CatalogCard>

      <CatalogCard title="Marketing" imgPath={imgMarketing} route={Routes.MARKETING}></CatalogCard>

      <CatalogCard title="Business" imgPath={imgBusiness} route={Routes.BUSINESS}></CatalogCard>
    </div>
  );
}

export default Courses;
