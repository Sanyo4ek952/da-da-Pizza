'use client';
import { FC } from 'react';
import { useCartStore } from '@shared/store';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '@shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@features/choose-product/ui/choose-product-form';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}
export const ProductForm: FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productItemId: number, ingredients?: number[]) => {
    try {
      const ItemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: ItemId,
        ingredients,
      });
      toast.success('Товар добавлен в корзину');
      _onSubmit?.();
    } catch (err) {
      console.log(err);
      toast.error('Не удалось добавить пиццу в корзину');
    }
  };
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        ingredients={product.ingredients}
        imageUrl={product.imageUrl}
        name={product.name}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      onSubmit={onSubmit}
      price={firstItem.price}
      items={product.items}
      id={firstItem.id}
      imageUrl={product.imageUrl}
      name={product.name}
      ingredients={[]}
      loading={loading}
    />
  );
};
