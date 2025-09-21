import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {TextField, Button, Card, CardContent, CardHeader, Box, Typography} from '@mui/material'
import { useRegister } from 'hooks/useAuth'
import { Link } from 'react-router-dom'
import bgImage from '../assets/bg-grocery.jpg'

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
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        m: 0,
        p: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          flex: '0 0 400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'rgba(255,255,255,0.6)',
        }}
      >
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
          <Typography variant="body2" sx={{ my: 2, textAlign: 'center' }}>
            Don’t have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign In
            </Link>
          </Typography>
        </Card>
      </Box>
      <Box sx={{ flex: 1 }} />
    </Box>
  )
}

export default RegisterForm
