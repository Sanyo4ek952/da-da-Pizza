'use client'
import React, { useEffect } from 'react'
import { RangeSlider, Title } from '@/components/shared'
import { Input } from '@/components/ui'
import { CheckboxFiltersGroup } from '@/components/shared/checkbox-filters-group'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import { useSet } from 'react-use'

interface Props {
  className?: string
}

interface PriceProps {
  priceFrom: number
  priceTo: number
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients()
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<String>([]))
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<String>([]))
  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  })

  const items = ingredients.map(item => ({
    value: String(item.id),
    text: item.name,
  }))

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...prices, [name]: value })
  }
  useEffect(() => {
    console.log({ sizes, pizzaTypes, prices, selectedIngredients })
  }, [sizes, pizzaTypes, prices, selectedIngredients])
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
        onClickCheckbox={togglePizzaTypes}
        selectedValues={pizzaTypes}
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
        onClickCheckbox={toggleSizes}
        selectedValues={sizes}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={e => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(prices.priceTo)}
            onChange={e => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
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
        onClickCheckbox={onAddId}
        selectedValues={selectedIngredients}
      />
    </div>
  )
}
