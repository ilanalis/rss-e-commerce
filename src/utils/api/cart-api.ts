import { ByProjectKeyRequestBuilder, LineItem } from '@commercetools/platform-sdk';
import { localStorageCartsId } from '../const';
import { Response } from './user-api';

function saveCartId(id: string) {
  localStorage.setItem(localStorageCartsId, id);
}
function getCartId() {
  return localStorage.getItem(localStorageCartsId);
}

function getCartVersion(
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

export function getCartProducts(apiRoot: ByProjectKeyRequestBuilder): Promise<Response> {
  const cartId = getCartId();

  if (!cartId) return Promise.resolve({ success: true, products: [] });

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
      console.log('Product added to cart:', response.body);

      return { success: true };
    })
    .catch((error) => {
      console.log('Error adding product to cart:', error);

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
