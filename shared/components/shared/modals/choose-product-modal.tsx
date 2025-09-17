'use client';
import { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
  product: ProductWithRelations;
}
export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      router.back();
    }
  }, [open, router]);
  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
      ingredients: [],
    });
    toast.success('Товар добавлен в корзину');
    setOpen(false);
  };
  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success('Товар добавлен в корзину');
      setOpen(false);
    } catch (error) {
      toast.error('Не удалось добавить пиццу в корзину');
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogDescription>
        Здесь вы можете выбрать размер и ингредиенты для вашей пиццы.
      </DialogDescription>
      <DialogTitle>Описание пиццы</DialogTitle>
      <DialogContent
        className={cn(
          className,
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            ingredients={product.ingredients}
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onSubmit={onAddPizza}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            onSubmit={onAddProduct}
            price={firstItem.price}
            items={product.items}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={[]}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
