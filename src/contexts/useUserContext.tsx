'use client';

import React from 'react';
import { UserContext } from './userContext';

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return context;
}
