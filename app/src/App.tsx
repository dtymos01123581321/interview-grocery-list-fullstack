import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import { Add, Edit, Save } from '@mui/icons-material'

import { queryClient } from '@utils/client'
import GroceryList from '@components/GroceryList'
import GroceryForm from '@components/GroceryForm'
import LoginForm from '@components/LoginForm'
import Layout from '@components/Layout'
import RegisterForm from '@components/RegisterForm'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  const [openForm, setOpenForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleFormOpen = () => {
    setOpenForm(true)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onSuccess={() => (window.location.href = '/groceries')} />} />
          <Route path="/register" element={<RegisterForm onSuccess={() => (window.location.href = '/login')} />} />
          <Route
            path="/groceries"
            element={
              <ProtectedRoute>
                <Layout>
                  <Card sx={{ my: 4 }} variant="outlined">
                    <CardHeader
                      title="Grocery List"
                      action={
                        <>
                          <IconButton onClick={handleEditClick}>
                            {isEditing ? <Save /> : <Edit />}
                          </IconButton>
                          <IconButton onClick={handleFormOpen}>
                            <Add />
                          </IconButton>
                        </>
                      }
                    />
                    <CardContent>
                      <GroceryList isEditing={isEditing} />
                      <GroceryForm openForm={openForm} setOpenForm={setOpenForm} />
                    </CardContent>
                  </Card>
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
