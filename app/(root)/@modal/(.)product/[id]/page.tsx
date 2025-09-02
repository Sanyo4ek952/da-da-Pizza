import { ChooseProductModal } from '@/shared/components/shared'
import { notFound } from 'next/navigation'
import { prisma } from '@/prisma/prisma-client'

export default async function ProductModalPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  })
  if (!product) {
    return notFound()
  }
  console.log(product)
  return <ChooseProductModal product={product} />
}
