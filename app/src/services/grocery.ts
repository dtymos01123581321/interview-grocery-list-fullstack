import ky from 'ky'

import { env } from '@constants/env'
import {GroceryFormItem, GroceryItem, UpdateGroceryDto} from "../types/data";

export const getGroceryList = async (params: { priority?: number; status?: string; perPage?: number }) => {
  const searchParams = new URLSearchParams(params as Record<string, string>)
  const response = await ky.get(`${env.API_URL}/grocery`, { searchParams }).json<{ data: GroceryItem[] }>()

  return response.data
}

export const createGroceryItem = async (groceryItem: GroceryFormItem) => {
  const response = await ky.post(`${env.API_URL}/grocery`, { json: groceryItem }).json<{ data: GroceryItem }>()

  return response.data
}

export const updateGroceryItem = async (id: string, data: UpdateGroceryDto) => {
  const response = await ky.put(`${env.API_URL}/grocery/${id}`, { json: data }).json<{ data: GroceryItem }>()
  return response.data
}

export const deleteGroceryItem = async (id: string) => {
  const response = await ky.delete(`${env.API_URL}/grocery/${id}`).json<{ data: GroceryItem }>()
  return response.data
}
