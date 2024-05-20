'use client';

import React from 'react';
import { ApiRootContext } from './apiRootContext';

export function useApiRootContext() {
  const context = React.useContext(ApiRootContext);
  if (!context) {
    throw new Error('useApiRootContext must be used within a ApiRootContextProvider');
  }

  return context;
}
