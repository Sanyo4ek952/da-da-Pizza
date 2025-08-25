import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductGroupList } from '@/components/shared/product-group-list'

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
              <ProductGroupList
                title={'Пиццы'}
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf24170179679a7872f2ddf16d18.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
