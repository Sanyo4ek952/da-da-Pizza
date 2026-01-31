'use client';
import { useSearchParams } from 'next/navigation';

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

  const createSetFromParams = (value?: string | null) => {
    return new Set<string>(value ? value.split(',').filter(Boolean) : []);
  };

  const [selectedIngredients, setSelectedIngredientsState] = useState<
    Set<string>
  >(() => createSetFromParams(searchParams.get('ingredients')));

  const [sizes, setSizesState] = useState<Set<string>>(() =>
    createSetFromParams(searchParams.get('sizes'))
  );

  const [pizzaTypes, setPizzaTypesState] = useState<Set<string>>(() =>
    createSetFromParams(searchParams.get('pizzaTypes'))
  );

  const toggleSetValue = useCallback(
    (value: string, cb: typeof setSizesState) => {
      cb((prev) => {
        const updatedSet = new Set(prev);

        if (updatedSet.has(value)) {
          updatedSet.delete(value);
        } else {
          updatedSet.add(value);
        }

        return updatedSet;
      });
    },
    []
  );

  const resetSet = useCallback((cb: typeof setSizesState) => cb(new Set()), []);

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };
  const resetFilters = useCallback(() => {
    resetSet(setSizesState);
    resetSet(setPizzaTypesState);
    resetSet(setSelectedIngredientsState);
    setPrices({ priceFrom: undefined, priceTo: undefined });
  }, [resetSet]);
  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setPizzaTypes: (value: string) =>
        toggleSetValue(value, setPizzaTypesState),
      setSizes: (value: string) => toggleSetValue(value, setSizesState),
      setSelectedIngredients: (value: string) =>
        toggleSetValue(value, setSelectedIngredientsState),
      resetFilters,
    }),
    [
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      toggleSetValue,
      resetFilters,
    ]
  );
};
