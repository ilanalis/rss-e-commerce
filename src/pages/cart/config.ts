import { getCartProducts, getDiscountName } from '@/utils/api/cart-api';
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
  setIsDiscountApplied?: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}

export const fetchProductsList = async ({
  apiRoot,
  setProducts,
  setIsCartEmpty,
  setCart,
  setCartProductsQuantity,
  setIsDiscountApplied,
  setInputValue,
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
        if (response.cart?.discountCodes.length && setIsDiscountApplied && setInputValue) {
          setIsDiscountApplied(true);
          const discountResponse = await getDiscountName(
            apiRoot,
            response.cart.discountCodes[0].discountCode.id,
          );
          setInputValue(discountResponse?.discountName || '');
        }
      }
    }
  }
};

export function getPrice(product: LineItem) {
  const price = ((product.variant.prices && product.variant.prices[0].value.centAmount) || 0) / 100;
  const finalPrice =
    ((product.variant.prices && product.variant.prices[0].discounted?.value.centAmount) || 0) / 100;
  if (finalPrice) {
    return finalPrice;
  }
  return price;
}

export function calculateProductsSum(products: LineItem[]) {
  return products.reduce((acc, product) => {
    return acc + getPrice(product) * product.quantity;
  }, 0);
}
