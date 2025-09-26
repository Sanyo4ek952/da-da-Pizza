'use client';

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { FC } from 'react';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="18ac106f7aa346c9c9cb8c724b9b91dac78aa4ce"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
