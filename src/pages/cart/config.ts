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
}

export const fetchProductsList = async ({
  apiRoot,
  setProducts,
  setIsCartEmpty,
  setCart,
}: FetchProductsListProps) => {
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
