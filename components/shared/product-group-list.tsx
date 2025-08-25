import React from 'react'
import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/shared/product-card'

interface Props {
  className?: string
  items: any[]
  categoryId: number
  listClassName?: string
  title: string
}

export const ProductGroupList: React.FC<Props> = ({
  className,
  items,
  categoryId,
  listClassName,
  title,
}) => {
  return (
    <div className={className}>
      <Title text={title} size={'lg'} className={'mb-5 font-extrabold'} />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            imgUrl={product.imageUrl}
            key={product.id}
          />
        ))}
      </div>
    </div>
  )
}
