'use client';

import React, { createContext, useState } from 'react';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContext = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
