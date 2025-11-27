'use client';
import React, { useState } from 'react';
import { Filters } from '@widgets/filters-bar/ui/filters';
import { Button, Dialog } from '@shared/ui';
import { DialogContent } from '@shared/ui/dialog';
import { cn } from '@shared/lib/utils';

interface Props {
  className?: string;
}

export const FiltersModal = ({ className }: Props) => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <div className={cn(className)}>
      <Button
        className={'w-full mx-4 mb-5'}
        onClick={() => setOpenFilters((prev) => !prev)}
      >
        Filters
      </Button>
      {openFilters && (
        <Dialog onOpenChange={setOpenFilters} open={openFilters}>
          <DialogContent className={cn(' bg-white overflow-hidden')}>
            <Filters className={'p-4'} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
