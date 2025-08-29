'use client'
import React, { ChangeEvent, useState } from 'react'
import { FilterCheckbox, FilterCheckboxProps } from '@/components/shared/filter-checkbox'
import { Input, Skeleton } from '@/components/ui'

type Item = FilterCheckboxProps

interface Props {
  className?: string
  title?: string
  items: Item[]
  defaultItems: Item[]
  limit?: number
  loading: boolean
  searchInputPlaceholder?: string
  onChange?: (values: string[]) => void
  defaultValue?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  className,
  title,
  items,
  defaultItems,
  defaultValue,
  loading,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  onChange,
}) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className={'h-6 mb-4 rounded-[8px]'} />)}
        <Skeleton className={'w-28 h-6 mb-4 rounded-[8px]'} />
      </div>
    )
  }
  const list = showAll
    ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    : defaultItems.slice(0, limit)

  const toggleShowAll = () => {
    setShowAll(prev => !prev)
  }
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className={'border-gray-50 border-none'}
          ></Input>
        </div>
      )}
      <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
        {list?.map((item, index) => (
          <FilterCheckbox
            endAdornment={item.endAdornment}
            checked={false}
            onCheckedChange={ids => console.log(ids)}
            text={item.text}
            key={index}
            value={item.value}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt4' : ''}>
          <button className={'text-primary mt-3 '} onClick={toggleShowAll}>
            {showAll ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
