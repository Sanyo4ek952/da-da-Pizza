'use client'
import React, { useEffect } from 'react'
import { useIntersection } from 'react-use'
import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/shared/product-card'
import { useCategoryStore } from '@/story/category'

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
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = React.useRef(null)

  // @ts-ignore
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting, title, categoryId])

  return (
    <div className={className} id={title} ref={intersectionRef}>
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
