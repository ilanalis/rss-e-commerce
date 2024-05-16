import { Client } from '@commercetools/sdk-client-v2';
import { createAnonymousSession, createAuthorizedSession } from './build-client';
import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';

function createApiRoot(session: Client): ByProjectKeyRequestBuilder {
  const apiRoot = createApiBuilderFromCtpClient(session).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });
  return apiRoot;
}

export function createAnonymousApiBuilder(): ByProjectKeyRequestBuilder {
  return createApiRoot(createAnonymousSession());
}

function createAuthorizedApiBuilder(
  username: string,
  password: string,
): ByProjectKeyRequestBuilder {
  return createApiRoot(createAuthorizedSession(username, password));
}

export function login(
  apiRoot: ByProjectKeyRequestBuilder,
  email: string,
  password: string,
): Promise<ByProjectKeyRequestBuilder> {
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute()
    .catch((error) => {
      console.error('Error during API request:', error);
    })
    .then(() => {
      return createAuthorizedApiBuilder(email, password);
    });
}

export function register(apiRoot: ByProjectKeyRequestBuilder, customerDraft: MyCustomerDraft) {
  return apiRoot
    .me()
    .signup()
    .post({ body: customerDraft })
    .execute()
    .then((response) => {
      if (response.statusCode === 201) {
        return createAuthorizedApiBuilder(customerDraft.email, customerDraft.password);
      } else {
        console.error('Error while registering user:', response);
      }
    })
    .catch((error) => {
      console.error('Error while registering user:', error);
    });
}

export function logout(): ByProjectKeyRequestBuilder {
  return createAnonymousApiBuilder();
}
