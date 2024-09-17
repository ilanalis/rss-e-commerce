import { LineItem } from '@commercetools/platform-sdk';
import styles from '../style.module.css';
import { FC } from 'react';

interface ProductItemProps {
  product: LineItem;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <div className={styles.productItem}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.productImg}
          src={product.variant.assets && product.variant.assets[0].sources[0].uri}
          alt=""
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.productName}>{product.name['en-GB']}</div>
          <span className={styles.productPrice}>
            {((product.variant.prices && product.variant.prices[0].value.centAmount) || 0) / 100}$
          </span>
        </div>
        <div className={styles.totalCostBlock}>
          <span>{`quantity: ${product.quantity}`}</span>
          <span>
            {`total cost: ${(product.quantity * ((product.variant.prices && product.variant.prices[0].value.centAmount) || 0)) / 100}`}
            $
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
