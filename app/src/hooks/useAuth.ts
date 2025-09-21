import { useMutation } from '@tanstack/react-query'
import { login, register } from '@services/auth'

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  })
}

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: register,
  })
}
