import React, { FC } from 'react';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@shared/lib/utils';
import { Button, Title } from '@shared/ui';
import Image from 'next/image';

interface Props {
  imageUrl: string;
  name: string;
  id: number;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number) => void;
  className?: string;
  price: number;
}
export const ChooseProductForm: FC<Props> = ({
  name,
  imageUrl,
  price,
  loading,
  onSubmit,
  id,
  className,
}) => {
  return (
    <div className={cn(className, 'flex flex-1 flex-row  max-xs:flex-col')}>
      <div
        className={cn(
          'flex items-center justify-center flex-1 relative w-full ',
          className
        )}
      >
        <Image
          src={imageUrl}
          alt="Logo"
          width={350}
          height={350}
          className={cn(
            'relative left-2 top-2 transition-all z-10 duration-300 w-[180px] h-[180px]',
            {}
          )}
        />
      </div>
      <div className=" bg-[#f7f6f5] p-7 flex-1">
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
        <Button
          loading={loading}
          onClick={() => onSubmit(id)}
          className="h-[55px] md:px-10  text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
