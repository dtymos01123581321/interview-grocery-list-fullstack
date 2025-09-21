import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLogin } from 'hooks/useAuth'

type LoginFormValues = {
  email: string
  password: string
}

const LoginForm: FC<{ onSuccess: (token: string) => void }> = ({ onSuccess }) => {
  const { handleSubmit, control } = useForm<LoginFormValues>()
  const login = useLogin()

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await login.mutateAsync(data)
      localStorage.setItem('token', res.token)
      onSuccess(res.token)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', my: 4 }}>
      <CardHeader title="Login" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            Login
          </Button>
        </form>

        {/* Додаємо лінк на сторінку реєстрації */}
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register here
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default LoginForm
