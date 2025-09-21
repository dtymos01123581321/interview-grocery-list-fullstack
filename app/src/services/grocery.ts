import ky from 'ky'

import { env } from '@constants/env'
import { GroceryFormItem, GroceryHistoryItem, GroceryItem, UpdateGroceryDto } from '../types/data';

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

export type GroceryStatus = 'HAVE' | 'WANT' | 'RANOUT'

export interface ListParams {
  priority?: number
  sortBy?: 'name' | 'priority' | 'quantity'
  status?: GroceryStatus
  perPage?: number
  order?: 'asc' | 'desc'
}

export const getGroceryList = async (params: ListParams) => {
  const searchParams = new URLSearchParams()
  if (params.status)   searchParams.set('status', params.status)
  if (params.priority !== undefined) searchParams.set('priority', String(params.priority))
  if (params.perPage !== undefined)  searchParams.set('perPage', String(params.perPage))
  if (params.sortBy)   searchParams.set('sortBy', params.sortBy)
  if (params.order)    searchParams.set('order', params.order)

  const res = await api.get('grocery', { searchParams }).json<{ data: GroceryItem[] }>()
  return res.data
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

export const getGroceryHistory = async (id: string) => {
  const response = await api.get(`grocery/${id}/history`).json<{ data: GroceryHistoryItem[] }>()
  return response.data
}
