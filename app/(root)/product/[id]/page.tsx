import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }
  return (
    <Container className={'flex flex-col my-10'}>
      <div className={'flex flex-1 '}>
        <PizzaImage size={40} imageUrl={product.imageUrl} />

        <div className={'w-[490px] bg-[#f3f2f1] p-7'}>
          <Title className={'font-extrabold mb-1'} text={product.name} size={'md'} />
          <p className={'text-gray-400'}>Lorem ipsum dolor sit amet.</p>
          <GroupVariants
            value={'2'}
            items={[
              {
                name: 'Маленькая',
                value: '1',
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
              },
            ]}
          />
        </div>
      </div>
    </Container>
  )
}
