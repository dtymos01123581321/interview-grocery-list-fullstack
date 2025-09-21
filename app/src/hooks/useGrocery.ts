import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createGroceryItem, deleteGroceryItem, getGroceryList, updateGroceryItem } from '@services/grocery'
import { queryClient } from '@utils/client'

import { GroceryFormItem, UpdateGroceryDto } from "../types/data";

export const useGroceryList = (
  params?: { priority?: number; status?: string; perPage?: number },
  enabled = true
) => {
  return useQuery({
    queryKey: ['groceryList', params],
    queryFn: () => getGroceryList({ ...params }),
    enabled,
  })
}

export const useCreateGrocery = () => {
  return useMutation({
    mutationKey: ['createGrocery'],
    mutationFn: (groceryItem: GroceryFormItem) => createGroceryItem(groceryItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGroceryDto }) => updateGroceryItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteGroceryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}
