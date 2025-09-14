'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface Variant {
  name: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  className?: string;
  items: readonly Variant[];
  value?: Variant['value'];
  onClick?: (value: Variant['value']) => void;
}

export const GroupVariants: React.FC<Props> = ({
  className,
  onClick,
  value,
  items,
}) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none'
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex items-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all decoration-400 text-sm',
            {
              'bg-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
