'use client';

import { CheckoutSidebar, Container, Title } from '@shared/components/shared';
import { useCart } from '@shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { checkoutFormSchema, CheckoutFormValues } from '@shared/constants';
import toast from 'react-hot-toast';
import { createOrder } from '@app/actions';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Api } from '@shared/api';
import { CheckoutCart } from '@widgets/checkout-sidebar/ui/checkout-cart';
import { CheckoutPersonalForm } from '@features/checkout/ui/checkout-personal-form';
import { CheckoutAddressForm } from '@features/checkout/ui/checkout-address-form';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });
  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');
      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success('Заказ успешно оформлен');
      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: 'X',
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Container className={'mt-10'}>
      <Title
        text={'Оформление заказа'}
        size={'lg'}
        className={'font-extrabold mb-8 '}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'flex gap-10'}>
            <div className={'flex flex-col gap-10 flex-1 mb-20 '}>
              <CheckoutCart
                loading={loading}
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>
            <div className={'w-[450px]'}>
              <CheckoutSidebar
                loading={loading || submitting}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
