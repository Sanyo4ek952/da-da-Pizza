import { Container, Title } from '@shared/ui';
import { Filters } from '@widgets/filters-bar/ui/filters';
import { ProductGroupList } from '@widgets/product-list/ui/product-group-list';
import { Stories } from '@widgets/stories/ui/stories';
import { TopBar } from '@widgets/top-bar/ui/top-bar';
import { findPizzas, GetSearchParams } from '@shared/lib/find-pizzas';
import { FiltersModal } from '@features/filters/ui/filters-modal';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const categories = await findPizzas(await searchParams);

  return (
    <>
      <Container className={'my-10 '}>
        <Title text={'Все товары'} size={'lg'} className={'font-extrabold'} />

        <TopBar
          categories={categories.filter(
            (category) => category.products.length > 0
          )}
        />

        <FiltersModal className={'xl:hidden block mx-4 my-5'} />
        <Stories className={'mb-5'} />
        <div className={'flex gap-[80px]'}>
          <div className={'w-[250px] xl:block hidden'}>
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
