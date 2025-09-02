'use client'
import { FC } from 'react'
import { cn } from '@/shared/lib/utils'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
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
      <DialogContent
        className={cn(
          className,
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} />
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
