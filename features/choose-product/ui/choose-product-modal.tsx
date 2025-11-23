'use client';
import { FC, useEffect, useState } from 'react';
import { cn } from '@shared/lib/utils';
import { ProductForm } from '@shared/components/shared';
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
        <ProductForm product={product} onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
