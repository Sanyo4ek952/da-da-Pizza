import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Api } from '@/services/api-client'
import { useSet } from 'react-use'

type IngredientItem = Pick<Ingredient, 'id' | 'name'>

interface ReturnProps {
  ingredients: IngredientItem[]
  loading: boolean
  selectedIngredients: Set<String>
  onAddId: (id: string) => void
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedIngredients, { toggle }] = useSet(new Set<String>([]))

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const ingredients = await Api.ingredients.getAll()
        setIngredients(
          ingredients.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
          }))
        )
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])
  return {
    ingredients,
    loading,
    selectedIngredients,
    onAddId: toggle,
  }
}
