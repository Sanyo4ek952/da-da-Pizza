'use client'
import { FC } from 'react'
import { cn } from '@/shared/lib/utils'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  product: ProductWithRelations
}
export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType)

  return (
    <Dialog onOpenChange={() => router.back()} open={Boolean(product)}>
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
          />
        ) : (
          <ChooseProductForm
            items={product.items}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={[]}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
