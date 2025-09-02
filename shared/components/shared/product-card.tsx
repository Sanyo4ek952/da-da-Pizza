import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'
import { Plus } from 'lucide-react'

interface Props {
  id: number
  name: string
  price: number
  imgUrl: string
  className?: string
}

export const ProductCard: React.FC<Props> = ({ className, name, imgUrl, price, id }) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img src={imgUrl} alt={name} className="w-[215px] h-[215px] " />
        </div>
        <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'} />

        <p className={'text-sm text-gray-400 '}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className={'flex justify-between items-center mt-4'}>
          <span className={'text-[20px]'}>
            от <b>{price}</b>
          </span>
          <Button variant={'secondary'}>
            <Plus size={20} className=" mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
