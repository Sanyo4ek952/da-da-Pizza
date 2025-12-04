'use client';

import React from 'react';
import { cn } from '@shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from '@entities/cart/model/cart-item-details.types';
import * as CartItemDetails from '@entities/cart/ui/index';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        ' relative border-b-2 pb-1 flex gap-4 max-xs:flex-col lg:items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1 pt-2">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>
      <div className={'flex items-center gap-5 justify-center'}>
        <CartItemDetails.Price value={price} />

        <div className="flex items-center gap-5 lg:ml-20">
          <CartItemDetails.CountButton
            onClick={onClickCountButton}
            value={quantity}
          />
        </div>
        <button type="button" onClick={onClickRemove}>
          <X
            className="max-lg:absolute top-0 right-0 text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
