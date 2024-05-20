import {
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenCache,
  TokenStore,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

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
  refreshToken?: string;
  tokenCache?: TokenCache;
};

export class MyTokenCache implements TokenCache {
  set(cache: TokenStore): void {
    localStorage.setItem('userDDS', JSON.stringify(cache));
  }

  get(): TokenStore {
    const userCacheString = localStorage.getItem('userDDS') as string;
    return JSON.parse(userCacheString);
  }
}

export function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

type AuthOptionsConfig = {
  username?: string;
  password?: string;
  refreshToken?: string;
};

function createAuthOptions(config: AuthOptionsConfig = {}): AuthMiddlewareOptions {
  const options: AuthMiddlewareOptions = {
    host: getEnvVar('VITE_AUTH_URL'),
    projectKey: getEnvVar('VITE_PROJECT_KEY'),
    credentials: {
      clientId: getEnvVar('VITE_CLIENT_ID'),
      clientSecret: getEnvVar('VITE_CLIENT_SECRET'),
    },
    scopes: getEnvVar('VITE_SCOPES')?.split(','),
    fetch,
  };
  if (config.username && config.password) {
    options.tokenCache = new MyTokenCache();
    options.credentials.user = {
      username: config.username,
      password: config.password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };
  }

  if (config.refreshToken) {
    options.refreshToken = config.refreshToken;
  }

  return options;
}

function createSession(options: AuthMiddlewareOptions): Client {
  const clientBuilder = new ClientBuilder()
    .withProjectKey(options.projectKey)
    .withHttpMiddleware(httpMiddlewareOptions);
  if (options.credentials.user) {
    return clientBuilder.withPasswordFlow(options as PasswordAuthMiddlewareOptions).build();
  }

  if (options.refreshToken) {
    return clientBuilder.withRefreshTokenFlow(options as RefreshAuthMiddlewareOptions).build();
  }

  return clientBuilder.withAnonymousSessionFlow(options).build();
}

export function createAnonymousSession(): Client {
  const options = createAuthOptions();
  return createSession(options);
}

export function createAuthorizedSession(username: string, password: string): Client {
  const options = createAuthOptions({ username, password });
  return createSession(options);
}

export function refreshAuthorizedSession(refreshToken: string) {
  const options = createAuthOptions({ refreshToken });
  return createSession(options);
}
