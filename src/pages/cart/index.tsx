import styles from './style.module.css';
import { FC, useEffect, useState } from 'react';
import EmptyCart from '@pages/cart/emptyCart/EmptyCart';
import { getCartProducts } from '@/utils/api/cart-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Cart as CartType, LineItem } from '@commercetools/platform-sdk';
import ProductItem from './productItem/ProductItem';
import cn from 'classnames';

const Cart: FC = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [products, setProducts] = useState<LineItem[]>([]);
  const [cart, setCart] = useState<CartType>();
  const { apiRoot } = useApiRootContext();

  useEffect(() => {
    const fetchProductsList = async () => {
      if (apiRoot) {
        const response = await getCartProducts(apiRoot);
        if (response && response.success && response.products) {
          if (response.products.length === 0) {
            setIsCartEmpty(true);
            return;
          }
          setProducts(response.products);
          if (response.cart) setCart(response.cart);
        }
      }
    };
    fetchProductsList();
  }, [apiRoot]);

  return (
    <div className={cn('container', styles.cartContainer)}>
      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <div className={styles.cartContainer}>
          <div className={styles.productsList}>
            <h1 className={styles.header}>Your cart</h1>

            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.priceBlock}>
            <div className={styles.priceBlockContainer}>
              <span>Total cost:</span>
              <span>{cart?.totalPrice.centAmount && cart?.totalPrice.centAmount / 100}$</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
