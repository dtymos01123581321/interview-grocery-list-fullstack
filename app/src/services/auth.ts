import ky from 'ky'
import { env } from '@constants/env'

export const login = async (data: { email: string; password: string }) => {
  const response = await ky.post(`${env.API_URL}/auth/login`, { json: data }).json<{ token: string }>()
  return response
}

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await ky.post(`${env.API_URL}/auth/register`, { json: data }).json<{ id: string; email: string }>()
  return response
}
