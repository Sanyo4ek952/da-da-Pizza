import React, { FC } from 'react';
import {
  CheckoutItem,
  CheckoutItemSkeleton,
  WhiteBlock,
} from '@/shared/components/shared';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItems } from '@/shared/lib/get-cart-details';

interface Props {
  className?: string;
  items: CartStateItems[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void;
  removeCartItem: (id: number) => void;
  loading: boolean;
}
export const CheckoutCart: FC<Props> = ({
  className,
  items,
  onClickCountButton,
  removeCartItem,
  loading,
}) => {
  return (
    <WhiteBlock title={'1. Корзина'} className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <div className={'mb-2'} key={item.id}>
                <CheckoutItem
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  disabled={item.disabled}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              </div>
            ))}
      </div>
    </WhiteBlock>
  );
};
