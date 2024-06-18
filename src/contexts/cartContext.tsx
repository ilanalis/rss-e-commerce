'use client';

import React, { createContext, useState } from 'react';

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartContext = {
  cartProductsQuantity: number;
  setCartProductsQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartProductsQuantity, setCartProductsQuantity] = useState<number>(0);

  return (
    <CartContext.Provider value={{ cartProductsQuantity, setCartProductsQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
