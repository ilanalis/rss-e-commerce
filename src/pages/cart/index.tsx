import styles from './style.module.css';
import { FC, useEffect, useState } from 'react';
import EmptyCart from '@pages/cart/emptyCart/EmptyCart';
import { removeAllProductsFromCart } from '@/utils/api/cart-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Cart as CartType, LineItem } from '@commercetools/platform-sdk';
import ProductItem from './productItem/ProductItem';
import cn from 'classnames';
import { fetchProductsList } from './config';
import { useCartContext } from '@/contexts/useCartContext';

const Cart: FC = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [products, setProducts] = useState<LineItem[]>([]);
  const [cart, setCart] = useState<CartType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { apiRoot } = useApiRootContext();
  const { setCartProductsQuantity } = useCartContext();

  useEffect(() => {
    if (apiRoot) {
      fetchProductsList({ apiRoot, setProducts, setIsCartEmpty, setCart, setCartProductsQuantity });
    }
  }, [apiRoot, setCartProductsQuantity]);

  async function clearShoppingCart() {
    if (apiRoot) {
      const response = await removeAllProductsFromCart(apiRoot, products);

      if (response?.success) {
        setIsCartEmpty(true);
        setIsModalOpen(false);
        setCartProductsQuantity(0);
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
              <ProductItem
                key={product.id}
                product={product}
                setCart={setCart}
                setIsCartEmpty={setIsCartEmpty}
                setProducts={setProducts}
              />
            ))}
          </div>
          <div className={styles.cartInfoBlock}>
            <div className={styles.priceBlock}>
              <span>Total cost:</span>
              <span>
                {(cart?.totalPrice.centAmount && cart?.totalPrice.centAmount / 100)?.toFixed(2)}$
              </span>
            </div>
            <button onClick={() => setIsModalOpen(true)} className={styles.clearCartBtn}>
              Clear shopping cart
            </button>
          </div>
        </div>
      )}
      {isModalOpen ? (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <span className={styles.modalText}>
              Are you sure you want to clear the shopping cart?
            </span>
            <div className={styles.buttonsBlock}>
              <button
                className={cn(styles.modalButton, styles.cancelButton)}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button onClick={clearShoppingCart} className={styles.modalButton}>
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
