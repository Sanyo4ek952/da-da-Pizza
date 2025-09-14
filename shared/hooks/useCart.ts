import React from 'react';
import { useCartStore } from '../store';
import { CartStateItems } from '@/shared/lib/get-cart-details';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItems[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: any) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
