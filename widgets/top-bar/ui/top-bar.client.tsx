'use client';

import React from 'react';
import { Category } from '@prisma/client';
import { cn } from '@shared/lib/utils';
import { Container } from '@shared/ui';
import { Categories } from '@widgets/filters-bar/ui/categories';

export interface TopBarProps {
  className?: string;
  categories: Category[];
}

export const TopBarClient: React.FC<TopBarProps> = ({
  className,
  categories,
}) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className={'flex flex-wrap items-center justify-between'}>
        <Categories items={categories} />
        {/*<SortPopup />*/}
      </Container>
    </div>
  );
};
