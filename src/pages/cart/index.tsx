import styles from './style.module.css';
import { FC, useEffect, useState } from 'react';
import EmptyCart from '@pages/cart/emptyCart/EmptyCart';
import {
  addDiscountCode,
  removeAllProductsFromCart,
  removeDiscountCode,
} from '@/utils/api/cart-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Cart as CartType, LineItem } from '@commercetools/platform-sdk';
import ProductItem from './productItem/ProductItem';
import cn from 'classnames';
import { calculateProductsSum, fetchProductsList } from './config';
import { useCartContext } from '@/contexts/useCartContext';
import trashIcon from '../../assets/trash.png';
import { ToastContainer } from 'react-toastify';
import notify from '@/utils/notify';

const Cart: FC = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [products, setProducts] = useState<LineItem[]>([]);
  const [cart, setCart] = useState<CartType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDiscountApplied, setIsDiscountApplied] = useState<boolean>(false);
  const { apiRoot } = useApiRootContext();
  const { setCartProductsQuantity } = useCartContext();

  useEffect(() => {
    if (apiRoot) {
      fetchProductsList({
        apiRoot,
        setProducts,
        setIsCartEmpty,
        setCart,
        setCartProductsQuantity,
        setIsDiscountApplied,
        setInputValue,
      });
    }
  }, [apiRoot, setCartProductsQuantity]);

  const productSum = calculateProductsSum(products);
  const discountSize = productSum - (cart?.totalPrice.centAmount || 0) / 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

  async function enterCode() {
    if (!apiRoot) return;
    const response = await addDiscountCode(apiRoot, inputValue);

    if (response && response.success && response.products && response.cart) {
      setCart(response.cart);
      setIsDiscountApplied(true);
    } else if (response && response.errorMessage) {
      notify(response.errorMessage);
    }
  }

  async function removeCode() {
    if (!apiRoot) return;

    const response = await removeDiscountCode(apiRoot, cart?.discountCodes[0].discountCode.id);

    if (response && response.success && response.products && response.cart) {
      setCart(response.cart);
      setIsDiscountApplied(false);
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
              <form className={styles.form} action="" onSubmit={(e) => e.preventDefault()}>
                <input
                  disabled={isDiscountApplied}
                  type="text"
                  placeholder="enter discount code"
                  value={inputValue}
                  onChange={handleInputChange}
                  className={styles.codeInput}
                  maxLength={10}
                  required={true}
                />

                {isDiscountApplied ? (
                  <button className={styles.deleteCodeBtn} onClick={removeCode}>
                    <img className={styles.deleteCodeBtnIcon} src={trashIcon} alt="" />
                  </button>
                ) : (
                  <button
                    disabled={isDiscountApplied}
                    className={styles.codeSubmitBtn}
                    onClick={enterCode}
                  >
                    ENTER
                  </button>
                )}
              </form>
              {isDiscountApplied ? (
                <>
                  <div className={styles.subtotal}>
                    <span>Subtotal: </span>
                    <span>{productSum.toFixed(2)}$</span>
                  </div>
                  <div className={styles.discountSize}>
                    <span>Discount: </span>
                    <span>{discountSize.toFixed(2)}$</span>
                  </div>
                </>
              ) : null}

              <div className={styles.totalCartCost}>
                <span>Total cost: </span>
                <span>
                  {(cart?.totalPrice.centAmount && cart?.totalPrice.centAmount / 100)?.toFixed(2)}$
                </span>
              </div>
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
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Cart;
