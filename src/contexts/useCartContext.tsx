'use client';

import React from 'react';
import { CartContext } from './cartContext';

export function useCartContext() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return context;
}
