'use client';

import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';
import React from 'react';

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className={'mt-10'}>
      <Title
        text={'Оформление заказа'}
        size={'lg'}
        className={'font-extrabold mb-8 '}
      />
      <div className={'flex gap-10'}>
        <div className={'flex flex-col gap-10 flex-1 mb-20 '}>
          <WhiteBlock title={'1. Корзина'}>
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div className={'mb-2'} key={item.id}>
                  <CheckoutItem
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
          </WhiteBlock>
          <WhiteBlock title={'2. Персональные данные'}>
            <div className={'grid grid-cols-2 gap-5'}>
              <Input
                name={'firstName'}
                className={'text-base'}
                placeholder={'Имя'}
              />
              <Input
                name="lastName"
                className={'text-base'}
                placeholder={'Фамилия'}
              />
              <Input
                name="email"
                className={'text-base'}
                placeholder={'E-mail'}
              />
              <Input
                name="phone"
                className={'text-base'}
                placeholder={'Телефон'}
              />
            </div>
          </WhiteBlock>
          <WhiteBlock title={'3. Адрес доставки'}>
            <div className={'flex flex-col gap-5'}>
              <Input
                name={'firstName'}
                className={'text-base'}
                placeholder={'Введите адрес'}
              />
              <Textarea
                rows={5}
                className={'text-base'}
                placeholder={'Комментарий к заказу'}
              />
            </div>
          </WhiteBlock>
        </div>
        <div className={'w-[450px]'}>
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
