'use client';
import { useSearchParams } from 'next/navigation';

import { useSet } from 'react-use';
import { useCallback, useMemo, useState } from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFiltersProps extends PriceProps {
  pizzaTypes?: string[];
  sizes?: string[];
  ingredients?: string[];
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  resetFilters: () => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFiltersProps,
    string
  >;

  const [
    selectedIngredients,
    { toggle: toggleIngredients, reset: resetIngredients },
  ] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

  const [sizes, { toggle: toggleSizes, reset: resetSizes }] = useSet(
    new Set<string>(
      searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes, reset: resetPizzaTypes }] =
    useSet(
      new Set<string>(
        searchParams.get('pizzaTypes')
          ? searchParams.get('pizzaTypes')?.split(',')
          : []
      )
    );
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };
  const resetFilters = useCallback(() => {
    resetSizes();
    resetPizzaTypes();
    resetIngredients();
    setPrices({ priceFrom: undefined, priceTo: undefined });
  }, [resetIngredients, resetPizzaTypes, resetSizes]);
  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
      resetFilters,
    }),
    [
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      togglePizzaTypes,
      toggleSizes,
      toggleIngredients,
      resetFilters,
    ]
  );
};
