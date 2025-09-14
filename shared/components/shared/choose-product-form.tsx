import React, { FC } from 'react';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { Title } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
  price: number;
}
export const ChooseProductForm: FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  price,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div
        className={cn(
          'flex items-center justify-center flex-1 relative w-full',
          className
        )}
      >
        <img
          src={imageUrl}
          alt="Logo"
          className={cn(
            'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]',
            {}
          )}
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
        <Button
          // onClick={() => onSubmit()}
          className="h-[55px] px-10  text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
