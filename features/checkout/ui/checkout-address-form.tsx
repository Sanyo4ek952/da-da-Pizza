'use client';

import React from 'react';
import { WhiteBlock } from '@shared/components/shared/white-block';
import { FormTextarea } from '@shared/components/shared/form';
import { ErrorText } from '@shared/components';
import { Controller, useFormContext } from 'react-hook-form';
import AddressInputClient from '@shared/components/shared/addres-input-client';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInputClient onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
