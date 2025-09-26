import { FormTextarea, WhiteBlock } from '@/shared/components/shared';
import { AddressInput } from '@/shared/components/shared/address-input';
import { FC } from 'react';

interface Props {
  className?: string;
}
export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title={'3. Адрес доставки'} className={className}>
      <div className={'flex flex-col gap-5'}>
        <AddressInput />
        <FormTextarea
          name={'comment'}
          rows={5}
          className={'text-base'}
          placeholder={'Комментарий к заказу'}
        />
      </div>
    </WhiteBlock>
  );
};
