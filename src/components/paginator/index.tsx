import styles from './styles.module.css';
import { useState } from 'react';

type PaginatorProps = {
  totalItemsCount: number;
  pageSize: number;
  portionSize: number;
  onPageChanged: (num: number) => void;
};

const Paginator = ({ totalItemsCount, pageSize, portionSize, onPageChanged }: PaginatorProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pagesArray = [];

  const portionCount = Math.ceil(pagesCount / portionSize);

  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const activePage = (pagesNumber: number) => {
    let className =
      pagesNumber === currentPage ? `${styles.pageCurrentNumber}` : `${styles.pageNumber}`;
    if (leftPortionPageNumber === 1) {
      className = `${className} ${styles.firstDozen}`;
    }
    return className;
  };

  for (let i = 1; i <= pagesCount; i++) {
    pagesArray.push(i);
  }

  return (
    <div className={styles.pagesBlock}>
      {leftPortionPageNumber > 1 ? (
        <button onClick={() => setPortionNumber(portionNumber - 1)} className={styles.prevButton}>
          {'<'}
        </button>
      ) : null}
      <ul className={styles.pagesOfUsers}>
        {pagesArray
          .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
          .map((pageNumber) => {
            return (
              <li key={`pageNumber_${pageNumber}`}>
                <button
                  className={activePage(pageNumber)}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                    onPageChanged(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
      </ul>
      {portionCount > portionNumber ? (
        <button onClick={() => setPortionNumber(portionNumber + 1)} className={styles.nextButton}>
          {'>'}
        </button>
      ) : null}
    </div>
  );
};

export default Paginator;
