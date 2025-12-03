'use client';
import React, { useState } from 'react';
import { Filters } from '@widgets/filters-bar/ui/filters';
import { Button, Container, Dialog } from '@shared/ui';
import { DialogContent, DialogTitle } from '@shared/ui/dialog';
import { cn } from '@shared/lib/utils';

interface Props {
  className?: string;
}

export const FiltersModal = ({ className }: Props) => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <Container className={cn(className)}>
      <Button
        className={'w-full '}
        onClick={() => setOpenFilters((prev) => !prev)}
      >
        Filters
      </Button>
      {openFilters && (
        <Dialog onOpenChange={setOpenFilters} open={openFilters}>
          <DialogTitle className={'none'}></DialogTitle>
          <DialogContent className={cn('bg-white overflow-x-scroll h-full ')}>
            <Filters className={'w-full'} />
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};
