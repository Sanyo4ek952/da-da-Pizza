import React from 'react';
import { cn } from '@shared/lib/utils';
import Link from 'next/link';
import { Button, Title } from '@shared/ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';
import Image from 'next/image';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  className?: string;
  ingredients: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
  className,
  name,
  imgUrl,
  price,
  ingredients,
  id,
}) => {
  return (
    <Link
      href={`/product/${id}`}
      className={cn('flex flex-col gap-1', className)}
    >
      <div className="flex justify-center p-6 bg-secondary rounded-lg ">
        <Image width={215} height={215} src={imgUrl} alt={name} />
      </div>
      <Title
        text={name}
        size={'sm'}
        className={'mb-1 mt-3 font-bold max-xs:text-lg'}
      />

      <p className={'text-sm text-gray-400 grow'}>
        {ingredients.map((ingredient) => ingredient.name).join(', ')}
      </p>
      <div
        className={
          'flex justify-between items-center gap-2 mt-4 max-xs:flex-col'
        }
      >
        <span className={'text-[20px] max-xs:text-lg'}>
          от <b>{price}</b>
        </span>
        <Button variant={'secondary'}>
          <Plus size={20} className=" mr-1" />
          Добавить
        </Button>
      </div>
    </Link>
  );
};
