'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@shared/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@shared/ui/sheet';
import { CartDrawerItem } from '@widgets/cart-drawer/ui/cart-drawer-item';
import { useCart } from '@entities/cart/model/use-cart';
import { PizzaSize, PizzaType } from '@shared/constants/pizza';
import { getCartItemDetails } from '@shared/lib';
import { Title } from '@shared/components/shared/title';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 ? (
            <SheetHeader>
              <SheetTitle>
                В корзине{' '}
                <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          ) : (
            <SheetHeader>
              <SheetTitle className={'opacity-0'}>Корзина </SheetTitle>
            </SheetHeader>
          )}
          {!totalAmount && (
            <div
              className={
                'flex flex-col items-center justify-center w-72 mx-auto'
              }
            >
              <Image
                src={'/assets/images/empty-box.png'}
                width={120}
                alt={'Empty cart'}
                height={120}
              />
              <Title
                text={'Корзина пуста'}
                size={'sm'}
                className={'text-center font-bold my-2'}
              />
              <p className={'text-center text-neutral-500 mb-5'}>
                Добавьте хотя бы один товар, что бы совершить заказ
              </p>
              <SheetClose asChild>
                <Button className={'w-56 h-12 text-base'} size={'lg'}>
                  <ArrowLeft className={'w-5 mr-2'}>Вернуться назад</ArrowLeft>
                </Button>
              </SheetClose>
            </div>
          )}
          {totalAmount > 0 && (
            <>
              <div className={' mt-5 gap-2 overflow-auto  flex-1'}>
                {items.map((item) => (
                  <div className={'mb-2'} key={item.id}>
                    <CartDrawerItem
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className=" bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      loading={loading}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
