import styles from '../style.module.css';
import cart from '../../../assets/cart.png';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const EmptyCart: FC = () => {
  return (
    <div className={styles.emptyCartContainer}>
      <img className={styles.bgImage} src={cart} alt="" />
      <span>
        Oops! Your cart is currently empty. Start adding your favorite courses to begin your
        learning journey!
      </span>
      <NavLink className={styles.navLink} to="/catalog">
        To catalog
      </NavLink>
    </div>
  );
};

export default EmptyCart;
