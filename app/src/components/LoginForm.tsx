import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Typography, Box, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLogin } from 'hooks/useAuth'
import bgImage from '../assets/bg-grocery.jpg'

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
        <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 360 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
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
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don’t have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Register here
            </Link>
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ flex: 1 }} />
    </Box>
  )
}

export default LoginForm
