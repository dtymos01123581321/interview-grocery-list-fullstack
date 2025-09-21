import ky from 'ky'

import { env } from '@constants/env'
import { GroceryFormItem, GroceryItem, UpdateGroceryDto } from '../types/data';

const api = ky.create({
  prefixUrl: env.API_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('token')
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})

export const getGroceryList = async (params: { priority?: number; status?: string; perPage?: number }) => {
  const searchParams = new URLSearchParams(params as Record<string, string>)
  const response = await api.get(`grocery`, { searchParams }).json<{ data: GroceryItem[] }>()

  return response.data
}

export const createGroceryItem = async (groceryItem: GroceryFormItem) => {
  const response = await api.post(`grocery`, { json: groceryItem }).json<{ data: GroceryItem }>()

  return response.data
}

export const updateGroceryItem = async (id: string, data: UpdateGroceryDto) => {
  const response = await api.put(`grocery/${id}`, { json: data }).json<{ data: GroceryItem }>()
  return response.data
}

export const deleteGroceryItem = async (id: string) => {
  const response = await api.delete(`grocery/${id}`).json<{ data: GroceryItem }>()
  return response.data
}
