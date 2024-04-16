'use client';

import { CartStorage, getCart } from '@/db/sessionStorageCart';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const ItemCartQuantityContext = createContext<
  [CartStorage, React.Dispatch<React.SetStateAction<CartStorage>>] | undefined
>(undefined);

export function useCartContext(): [
  CartStorage,
  React.Dispatch<React.SetStateAction<CartStorage>>
] {
  const modeState = useContext(ItemCartQuantityContext);
  if (modeState === undefined) {
    throw new Error(
      'useItemCartQuantityContext must be used with a ItemCartQuantityContext'
    );
  }
  return modeState;
}

const ItemCartProvider = ({ children }: { children: React.ReactNode }) => {
  const emptyCart: CartStorage = { cartProducts: [], quantity: 0 };
  const [cart, setCart] = useState(emptyCart);

  useEffect(() => {
    const cart: CartStorage = getCart();
    setCart(cart);
  }, []);

  return (
    <ItemCartQuantityContext.Provider value={[cart, setCart]}>
      {children}
    </ItemCartQuantityContext.Provider>
  );
};

export default ItemCartProvider;
