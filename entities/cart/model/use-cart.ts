import React from 'react';

import { CartStateItems } from '@entities/cart/lib/get-cart-details';
import { CreateCartItemValues } from '@shared/api/dto/cart';
import { useCartStore } from '@entities/cart/model/store';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItems[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
