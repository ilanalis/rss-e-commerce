'use client';

import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import React, { createContext, useState } from 'react';

type ApiRootContextProviderProps = {
  children: React.ReactNode;
};

type ApiRootContext = {
  apiRoot: ByProjectKeyRequestBuilder | null;
  setApiRoot: React.Dispatch<React.SetStateAction<ByProjectKeyRequestBuilder | null>>;
};

export const ApiRootContext = createContext<ApiRootContext | null>(null);

export default function ApiRootContextProvider({ children }: ApiRootContextProviderProps) {
  const [apiRoot, setApiRoot] = useState<ByProjectKeyRequestBuilder | null>(null);

  return (
    <ApiRootContext.Provider value={{ apiRoot, setApiRoot }}>{children}</ApiRootContext.Provider>
  );
}
