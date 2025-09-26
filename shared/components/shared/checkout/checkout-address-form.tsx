import React, { FC } from 'react';
import { Input, Textarea } from '@/shared/components/ui';
import { WhiteBlock } from '@/shared/components/shared';

interface Props {
  className?: string;
}
export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title={'3. Адрес доставки'} className={className}>
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
  );
};
