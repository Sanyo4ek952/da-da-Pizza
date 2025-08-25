import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductCard } from '@/components/shared/product-card'

export default function Home() {
  return (
    <>
      <Container className={'mt-10'}>
        <Title text={'Все пиццы'} size={'lg'} className={'font-extrabold'} />
      </Container>
      <TopBar />
      <Container className={'pb-14 mt-10 '}>
        <div className={'flex gap-[60px]'}>
          <div className={'w-[250px]'}>
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCard id={0} name={'Классическа'} price={230} imgUrl={'ds'} />
              <ProductCard id={0} name={'Классическа'} price={230} imgUrl={'ds'} />
              <ProductCard id={0} name={'Классическа'} price={230} imgUrl={'ds'} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
