import { getCartProducts } from '@/utils/api/cart-api';
import {
  ByProjectKeyRequestBuilder,
  LineItem,
  Cart as CartType,
} from '@commercetools/platform-sdk';

interface FetchProductsListProps {
  apiRoot: ByProjectKeyRequestBuilder;
  setProducts: React.Dispatch<React.SetStateAction<LineItem[]>>;
  setIsCartEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setCart: React.Dispatch<React.SetStateAction<CartType | null>>;
  setCartProductsQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const fetchProductsList = async ({
  apiRoot,
  setProducts,
  setIsCartEmpty,
  setCart,
  setCartProductsQuantity,
}: FetchProductsListProps) => {
  if (apiRoot) {
    const response = await getCartProducts(apiRoot);

    if (response && response.success && response.products) {
      if (response.products.length === 0) {
        setCartProductsQuantity(response.products.length);
        setIsCartEmpty(true);
      } else {
        setProducts(response.products);
        setCartProductsQuantity(response.products.length);
        if (response.cart) setCart(response.cart);
        setIsCartEmpty(false);
      }
    }
  }
};
