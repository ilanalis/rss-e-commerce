import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const scopes = import.meta.env.VITE_SCOPES.split(' ');
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL,
  fetch,
};

type AuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    anonymousId?: string;
    user?: {
      username: string;
      password: string;
      activeCartSignInMode: string;
    };
  };
  scopes?: Array<string>;
  oauthUri?: string;
  fetch?: typeof fetch;
  tokenCache?: TokenCache;
};
function createAuthOptions(username?: string, password?: string): AuthMiddlewareOptions {
  const options: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    scopes,
    fetch,
  };
  if (username && password) {
    options.credentials.user = {
      username,
      password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };
  }
  return options;
}

function createSession(options: AuthMiddlewareOptions): Client {
  const clientBuilder = new ClientBuilder()
    .withProjectKey(options.projectKey)
    .withHttpMiddleware(httpMiddlewareOptions);
  if (options.credentials.user) {
    return clientBuilder.withPasswordFlow(options as PasswordAuthMiddlewareOptions).build();
  } else {
    return clientBuilder.withAnonymousSessionFlow(options).build();
  }
}

export function createAnonymousSession(): Client {
  const options = createAuthOptions();
  return createSession(options);
}

export function createAuthorizedSession(username: string, password: string): Client {
  const options = createAuthOptions(username, password);
  return createSession(options);
}
