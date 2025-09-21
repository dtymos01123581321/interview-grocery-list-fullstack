import { FC, ReactNode } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            🛒 Grocery App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </Box>
  )
}

export default Layout
