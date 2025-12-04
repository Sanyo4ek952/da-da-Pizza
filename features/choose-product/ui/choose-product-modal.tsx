'use client';
import { FC, useEffect, useState } from 'react';
import { cn } from '@shared/lib/utils';
import { ProductForm } from '@features/choose-product/ui/product-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@shared/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '../../../@types/prisma';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      router.back();
    }
  }, [open, router]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogDescription className={'hidden'}>
        Здесь вы можете выбрать размер и ингредиенты для вашей пиццы.
      </DialogDescription>
      <DialogTitle className={'hidden'}>Описание пиццы</DialogTitle>
      <DialogContent
        className={cn(
          className,
          'p-0 w-full max-w-[1060px] min-h-[300px] bg-white overflow-hidden'
        )}
      >
        <ProductForm product={product} onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
