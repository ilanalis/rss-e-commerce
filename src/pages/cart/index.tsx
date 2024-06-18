import styles from './style.module.css';
import { FC, useEffect, useState } from 'react';
import EmptyCart from '@pages/cart/emptyCart/EmptyCart';
import { getCartProducts, removeAllProductsFromCart } from '@/utils/api/cart-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Cart as CartType, LineItem } from '@commercetools/platform-sdk';
import ProductItem from './productItem/ProductItem';
import cn from 'classnames';

const Cart: FC = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
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
          } else {
            setProducts(response.products);

            if (response.cart) setCart(response.cart);
            setIsCartEmpty(false);
          }
        }
      }
    };
    fetchProductsList();
  }, [apiRoot]);

  async function clearShoppingCart() {
    if (apiRoot) {
      const response = await removeAllProductsFromCart(apiRoot, products);

      if (response?.success) {
        setIsCartEmpty(true);
      }
    }
  }

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
          <div className={styles.cartInfoBlock}>
            <div className={styles.priceBlock}>
              <span>Total cost:</span>
              <span>{cart?.totalPrice.centAmount && cart?.totalPrice.centAmount / 100}$</span>
            </div>
            <button onClick={clearShoppingCart} className={styles.clearCartBtn}>
              Clear shopping cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
