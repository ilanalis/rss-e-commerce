import { MouseEventHandler, useState } from 'react';
import styles from './style.module.css';
import cn from 'classnames';
import { changeProductQuantity } from '@/utils/api/cart-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';

type AddProductProps = {
  id: string;
  selected: boolean;
};

function AddProduct({ id, selected }: AddProductProps) {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const { apiRoot } = useApiRootContext();

  const clickHandler: MouseEventHandler = async (evt) => {
    const button = evt.target as HTMLButtonElement;
    button.disabled = true;
    setLoading(true);
    if (!apiRoot) return;
    const response = await changeProductQuantity(apiRoot, id, 1);
    if (!response?.success) {
      setLoading(false);
      setActive(true);
      button.disabled = false;
      return;
    }

    setLoading(false);
    setActive(false);
  };

  return (
    <button
      onClick={clickHandler}
      className={cn(styles.button, {
        [styles.add]: active && !selected,
        [styles.loading]: loading,
      })}
      disabled={selected}
    >
      {'+'}
    </button>
  );
}

export default AddProduct;
