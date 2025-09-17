import {ChooseProductModal} from '@/shared/components/shared';
import {notFound} from 'next/navigation';
import {prisma} from '@/prisma/prisma-client';

type PageProps = {
  params: {
    id: string;
  };
};
export default async function ProductModalPage({ params }: PageProps) {
  const { id } = params;
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
  });
  if (!product) {
    return notFound();
  }
  return <ChooseProductModal product={product} />;
}
