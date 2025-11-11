'use client';
import React from 'react';
import {
  CheckboxFiltersGroup,
  RangeSlider,
  Title,
} from '@shared/components/shared';
import { Input } from '@shared/ui';
import { useFilters, useIngredients, useQueryFilters } from '@shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'} />

      <CheckboxFiltersGroup
        title={'Тип пиццы'}
        className={'mb-5'}
        name={'pizzaTypes'}
        items={[
          {
            text: 'Тонкое',
            value: '1',
          },
          {
            text: 'Традиционное',
            value: '2',
          },
        ]}
        onClickCheckbox={filters.setPizzaTypes}
        selectedValues={filters.pizzaTypes}
      />

      <CheckboxFiltersGroup
        title={'Размер'}
        className={'mb-5'}
        name={'sizes'}
        items={[
          {
            text: '20см',
            value: '20',
          },
          {
            text: '30см',
            value: '30',
          },
          {
            text: '40см',
            value: '40',
          },
        ]}
        onClickCheckbox={filters.setSizes}
        selectedValues={filters.sizes}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          onValueChange={updatePrices}
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
        />
      </div>
      <CheckboxFiltersGroup
        loading={loading}
        title={'Ингредиенты'}
        className={'mt-5'}
        name={'ingredients'}
        limit={6}
        items={items}
        defaultItems={items.slice(0, 6)}
        onClickCheckbox={filters.setSelectedIngredients}
        selectedValues={filters.selectedIngredients}
      />
    </div>
  );
};
