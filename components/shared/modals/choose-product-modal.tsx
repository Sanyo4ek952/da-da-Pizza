'use client'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ProductWithRelations } from '@/@types/prisma'
import { Title } from '@/components/shared'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  product: ProductWithRelations
}
export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter()
  return (
    <Dialog onOpenChange={() => router.back()} open={Boolean(product)}>
      <DialogContent
        className={cn(
          className,
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'
        )}
      >
        <Title text={product.name} />
      </DialogContent>
    </Dialog>
  )
}
