import { ReactNode } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import bgImage from '../assets/bg-list3.jpg'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* AppBar зверху */}
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">🛒 Grocery App</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Контент по центру */}
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.9)',
            borderRadius: 2,
            p: 3,
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}
