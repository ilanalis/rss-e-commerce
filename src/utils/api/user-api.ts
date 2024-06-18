import {
  BaseAddress,
  ByProjectKeyRequestBuilder,
  Cart,
  LineItem,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { login, logout } from './commercetools-api';

export interface Response {
  success: boolean;
  errorMessage?: string;
  email?: string;
  apiRoot?: ByProjectKeyRequestBuilder;
  products?: LineItem[];
  cartId?: string;
  cart?: Cart;
}

export function updatePersonalInfo(
  apiRoot: ByProjectKeyRequestBuilder,
  newFirstName: string,
  newLastName: string,
  newDateOfBirth: string,
  newEmail: string,
): Promise<Response> {
  return apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      const customerVersion = response.body.version;

      return apiRoot
        .me()
        .post({
          body: {
            version: customerVersion,
            actions: [
              { action: 'setFirstName', firstName: newFirstName },
              { action: 'setLastName', lastName: newLastName },
              { action: 'changeEmail', email: newEmail },
              { action: 'setDateOfBirth', dateOfBirth: newDateOfBirth },
            ],
          },
        })
        .execute();
    })
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}

export async function changePassword(
  apiRoot: ByProjectKeyRequestBuilder,
  currentPassword: string,
  newPassword: string,
): Promise<Response> {
  return apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      const customerVersion = response.body.version;
      return apiRoot
        .me()
        .password()
        .post({
          body: {
            currentPassword: currentPassword,
            newPassword: newPassword,
            version: customerVersion,
          },
        })
        .execute();
    })
    .then(async (response) => {
      const logoutResponse = logout();

      if (logoutResponse.success && logoutResponse.apiBuilder) {
        const loginResponse = await login(
          logoutResponse.apiBuilder,
          response.body.email,
          newPassword,
        );

        if (loginResponse.success && loginResponse.apiBuilder) {
          return { success: true, email: response.body.email, apiRoot: loginResponse.apiBuilder };
        } else if (loginResponse.errorMessage) {
          return { success: false, errorMessage: loginResponse.errorMessage };
        }
      }
      return { success: true, email: response.body.email };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}

function manageAddress(
  apiRoot: ByProjectKeyRequestBuilder,
  actions: MyCustomerUpdateAction[],
): Promise<Response> {
  return apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      const customerVersion = response.body.version;
      return apiRoot
        .me()
        .post({
          body: {
            version: customerVersion,
            actions,
          },
        })
        .execute();
    })
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}

export function deleteAddress(apiRoot: ByProjectKeyRequestBuilder, addressId: string) {
  return manageAddress(apiRoot, [{ action: 'removeAddress', addressId }]);
}

export function addNewAddress(apiRoot: ByProjectKeyRequestBuilder, address: BaseAddress) {
  return manageAddress(apiRoot, [{ action: 'addAddress', address }]);
}

export function changeAddress(
  apiRoot: ByProjectKeyRequestBuilder,
  addressId: string,
  address: BaseAddress,
) {
  return manageAddress(apiRoot, [{ action: 'changeAddress', addressId, address }]);
}

function getAddressId(apiRoot: ByProjectKeyRequestBuilder) {
  return apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      const addressId = response.body.addresses[response.body.addresses.length - 1]?.id;
      return { success: true, addressId };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message, addressId: undefined };
    });
}

async function setDefaultAddress(
  apiRoot: ByProjectKeyRequestBuilder,
  action: 'setDefaultShippingAddress' | 'setDefaultBillingAddress',
  addressId?: string,
) {
  if (addressId) {
    return manageAddress(apiRoot, [{ action, addressId }]);
  } else {
    const response = await getAddressId(apiRoot);
    if (response.success && response.addressId) {
      return manageAddress(apiRoot, [{ action, addressId: response.addressId }]);
    }
    return { success: false };
  }
}

export async function setDefaultShippingAddress(
  apiRoot: ByProjectKeyRequestBuilder,
  addressId?: string,
) {
  return setDefaultAddress(apiRoot, 'setDefaultShippingAddress', addressId);
}

export async function setDefaultBillingAddress(
  apiRoot: ByProjectKeyRequestBuilder,
  addressId?: string,
) {
  return setDefaultAddress(apiRoot, 'setDefaultBillingAddress', addressId);
}
