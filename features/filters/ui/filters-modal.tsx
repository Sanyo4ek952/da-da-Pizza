'use client';
import React, { useState } from 'react';
import { Filters } from '@widgets/filters-bar/ui/filters';
import { Button, Dialog } from '@shared/ui';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@shared/ui/dialog';
import { cn } from '@shared/lib/utils';

export const FiltersModal = () => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenFilters((prev) => !prev)}>Filters</Button>
      {openFilters && (
        <Dialog onOpenChange={setOpenFilters} open={openFilters}>
          <DialogDescription>
            Здесь вы можете выбрать размер и ингредиенты для вашей пиццы.
          </DialogDescription>
          <DialogTitle>Описание пиццы</DialogTitle>
          <DialogContent className={cn(' bg-white overflow-hidden')}>
            <Filters className={'p-4'} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
