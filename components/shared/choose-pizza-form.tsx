import { FC } from 'react'
import { Ingredient, ProductItem } from '@prisma/client'
import { cn } from '@/lib/utils'
import { ProductImage } from '@/components/shared/product-image'
import { Title } from '@/components/shared'
import { Button } from '@/components/ui'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items: ProductItem[]
  loading?: boolean
  onSubmit?: (itemId: number, ingredients: number[]) => void
  className?: string
}
export const ChoosePizzaForm: FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const textDetails = '30 см, традиционное тесто 30'
  const totalPrice = 350
  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={30} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
        <p className={'text-gray-400'}>{textDetails}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
