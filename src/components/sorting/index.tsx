import cn from 'classnames';
import styles from './style.module.css';
import arrowUp from '@/assets/icons8-up.png';
import arrowDown from '@/assets/icons8-down.png';
import { useState } from 'react';

type SortingProps = {
  setSort: (query: { [key: string]: string }) => void;
};

function Sorting({ setSort }: SortingProps) {
  const [activeSort, setActiveSort] = useState<string>('');

  const handleSort = (sortType: string) => {
    setSort({ sort: sortType });
    setActiveSort(sortType); // обновляем состояние при клике
  };

  return (
    <div className={styles.sorting}>
      <span className={styles.text}>Price:</span>
      <button
        className={cn(styles.button, styles.buttonAsc, {
          [styles.active]: activeSort === 'price asc',
        })}
        onClick={() => handleSort('price asc')}
      >
        <img className={styles.buttonIcon} src={arrowUp} alt="" />
        Asc
      </button>
      <button
        className={cn(styles.button, styles.buttonDesc, {
          [styles.active]: activeSort === 'price desc',
        })}
        onClick={() => handleSort('price desc')}
      >
        <img className={styles.buttonIcon} src={arrowDown} alt="" />
        Desc
      </button>
    </div>
  );
}

export default Sorting;
