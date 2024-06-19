import {
  ByProjectKeyRequestBuilder,
  LineItem,
  MyCartChangeLineItemQuantityAction,
} from '@commercetools/platform-sdk';
import { localStorageCartsId } from '../const';
import { Response } from './user-api';

function saveCartId(id: string) {
  localStorage.setItem(localStorageCartsId, id);
}
function getCartId() {
  return localStorage.getItem(localStorageCartsId);
}

export function getCartVersion(
  apiRoot: ByProjectKeyRequestBuilder,
  cartId: string,
): Promise<number | void> {
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute()
    .then((response) => {
      const cartVersion = response.body.version;

      return cartVersion;
    })
    .catch((error) => {
      console.log('Error fetching cart:', error);
    });
}

export function createCart(apiRoot: ByProjectKeyRequestBuilder): Promise<Response> {
  return apiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute()
    .then((response) => {
      const cartId = response.body.id;

      console.log('Cart created with ID:', cartId);
      saveCartId(cartId);
      return { success: true, cartId };
    })
    .catch((error) => {
      console.log('Error creating cart:', error);
      return { success: false };
    });
}

export function getCartProducts(apiRoot: ByProjectKeyRequestBuilder): Promise<Response> | Response {
  const cartId = getCartId();

  if (!cartId) return { success: true, products: [] };

  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute()
    .then((response) => {
      if (response.body) {
        return { success: true, products: response.body.lineItems, cart: response.body };
      } else {
        console.log('No cart found for this anonymous user.');

        return { success: false };
      }
    })
    .catch((error) => {
      console.log('Error fetching cart:', error);

      return { success: false, error };
    });
}

async function addProductToLineItems(
  apiRoot: ByProjectKeyRequestBuilder,
  productId: string,
): Promise<Response | undefined> {
  let cartId = getCartId();

  if (!cartId) {
    const response = await createCart(apiRoot);
    if (response.success && response.cartId) {
      cartId = response.cartId;
    } else {
      return;
    }
  }

  const cartVersion = await getCartVersion(apiRoot, cartId);

  if (!cartVersion) return;

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      },
    })
    .execute()
    .then((response) => {
      console.log('Product added to cart:', response.body);

      return { success: true };
    })
    .catch((error) => {
      console.log('Error adding product to cart:', error);

      return { success: false, error };
    });
}

export async function changeProductQuantity(
  apiRoot: ByProjectKeyRequestBuilder,
  productId: string,
  quantity: number,
): Promise<Response | undefined> {
  const lineItemId = await getLineItemId(apiRoot, productId);

  if (!lineItemId) {
    const response = await addProductToLineItems(apiRoot, productId);
    return response;
  }

  let cartId = getCartId();

  if (!cartId) {
    const response = await createCart(apiRoot);
    if (response.success && response.cartId) {
      cartId = response.cartId;
    } else {
      return;
    }
  }

  const cartVersion = await getCartVersion(apiRoot, cartId);

  if (!cartVersion) return;

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute()
    .then((response) => {
      console.log('Product quantity changed:', response.body);

      return { success: true };
    })
    .catch((error) => {
      console.log('Error changing product quantity in cart:', error);

      return { success: false, error };
    });
}

async function getLineItemId(apiRoot: ByProjectKeyRequestBuilder, productId: string) {
  const response = await getCartProducts(apiRoot);

  if (response?.products) {
    const lineItemId = response?.products.find(
      (product: LineItem) => product.productId === productId,
    );

    if (lineItemId) return lineItemId.id;
  }
}

export async function removeAllProductsFromCart(
  apiRoot: ByProjectKeyRequestBuilder,
  products: LineItem[],
): Promise<Response | undefined> {
  const actions: MyCartChangeLineItemQuantityAction[] = [];
  products.forEach((product) => {
    const action: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      quantity: 0,
      lineItemId: product.id,
    };
    actions.push(action);
  });

  const cartId = getCartId();

  if (!cartId) return;

  const cartVersion = await getCartVersion(apiRoot, cartId);

  if (!cartVersion) return;

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions,
      },
    })
    .execute()
    .then((response) => {
      console.log('All products removed from cart:', response.body);

      return { success: true };
    })
    .catch((error) => {
      console.log('Error removing all products from cart:', error);

      return { success: false, error };
    });
}

export async function addDiscountCode(
  apiRoot: ByProjectKeyRequestBuilder,
  code: string,
): Promise<Response | undefined> {
  const cartId = getCartId();

  if (!cartId) return;

  const cartVersion = await getCartVersion(apiRoot, cartId);

  if (!cartVersion) return;

  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [{ action: 'addDiscountCode', code }],
      },
    })
    .execute()
    .then((response) => {
      if (response.body) {
        return { success: true, products: response.body.lineItems, cart: response.body };
      } else {
        console.log('error while adding discount code');

        return { success: false };
      }
    })
    .catch((error) => {
      console.log('error while adding discount code:', error);

      return { success: false, errorMessage: error.message };
    });
}

export async function removeDiscountCode(
  apiRoot: ByProjectKeyRequestBuilder,
  discountId: string | undefined,
): Promise<Response | undefined> {
  const cartId = getCartId();

  if (!cartId || !discountId) return;

  const cartVersion = await getCartVersion(apiRoot, cartId);

  if (!cartVersion) return;
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: { typeId: 'discount-code', id: discountId },
          },
        ],
      },
    })
    .execute()
    .then((response) => {
      if (response.body) {
        return { success: true, products: response.body.lineItems, cart: response.body };
      } else {
        console.log('error while removing discount code');

        return { success: false };
      }
    })
    .catch((error) => {
      console.log('error while removing discount code:', error);

      return { success: false, errorMessage: error };
    });
}

export async function getDiscountName(
  apiRoot: ByProjectKeyRequestBuilder,
  discountId: string | undefined,
): Promise<Response | undefined> {
  if (!discountId) return;

  return apiRoot
    .discountCodes()
    .withId({ ID: discountId })
    .get()
    .execute()
    .then((response) => {
      if (response.body) {
        return { success: true, discountName: response.body.code };
      } else {
        console.log('error while getting discount code');

        return { success: false };
      }
    })
    .catch((error) => {
      console.log('error while getting discount code:', error);

      return { success: false, errorMessage: error };
    });
}
