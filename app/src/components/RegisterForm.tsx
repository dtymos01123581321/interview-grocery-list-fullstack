import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Card, CardContent, CardHeader } from '@mui/material'
import { useRegister } from 'hooks/useAuth'

type RegisterFormValues = {
  name: string
  email: string
  password: string
}

type RegisterResponse = {
  id: string
  email: string
}

const RegisterForm: FC<{ onSuccess: (res: RegisterResponse) => void }> = ({ onSuccess }) => {
  const { handleSubmit, control } = useForm<RegisterFormValues>()
  const register = useRegister()

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res: RegisterResponse = await register.mutateAsync(data)
      onSuccess(res)
    } catch (err) {
      console.error('Register failed', err)
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', my: 4 }}>
      <CardHeader title="Register" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="dense" />}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Email" fullWidth margin="dense" />}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="dense" />
            )}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
