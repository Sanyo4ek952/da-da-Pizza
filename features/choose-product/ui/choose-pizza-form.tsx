'use client';
import React, { FC } from 'react';

import { Button } from '@shared/ui';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@shared/lib/utils';
import { usePizzaOptions } from '@entities/product/lib/use-pizza-options';
import { getPizzaDetails } from '@entities/product/lib/get-pizza-details';
import { GroupVariants, IngredientItem, PizzaImage, Title } from '@shared/ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@shared/constants';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
}
export const ChoosePizzaForm: FC<Props> = ({
  name,
  ingredients,
  imageUrl,
  onSubmit,
  loading,
  items,
  className,
}) => {
  const {
    size,
    setSize,
    selectedIngredients,
    currentItemId,
    addIngredients,
    setType,
    type,
    availableSizes: availablePizzaSizes,
  } = usePizzaOptions(items);
  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const handleClick = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} className={'flex-1'} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
        <p className={'text-gray-400'}>{textDetails}</p>
        <div className={'flex flex-col gap-5 mt-5'}>
          <GroupVariants
            onClick={(value) => setSize(Number(value) as PizzaSize)}
            value={String(size)}
            items={availablePizzaSizes}
          />
          <GroupVariants
            onClick={(value) => setType(Number(value) as PizzaType)}
            value={String(type)}
            items={pizzaTypes}
          />
          <div
            className={
              'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'
            }
          >
            <div className={'grid grid-cols-3 gap-3'}>
              {ingredients.map((ingredient) => (
                <IngredientItem
                  price={ingredient.price}
                  key={ingredient.id}
                  imageUrl={ingredient.imageUrl}
                  name={ingredient.name}
                  onClick={() => addIngredients(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
