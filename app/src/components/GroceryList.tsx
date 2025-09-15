import { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  TextField,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useDeleteGrocery, useGroceryList, useUpdateGrocery } from 'hooks/useGrocery'

const GroceryList: FC<{ isEditing?: boolean }> = ({ isEditing }) => {
  const { data, isLoading, isError, error } = useGroceryList()
  const updateGrocery = useUpdateGrocery()
  const deleteGrocery = useDeleteGrocery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const handleQuantityChange = (id: string, newValue: number) => {
    updateGrocery.mutate({
      id,
      data: { quantity: newValue },
    })
  }

  const handleStatusToggle = (id: string, currentStatus?: 'HAVE' | 'WANT') => {
    updateGrocery.mutate({
      id,
      data: { status: currentStatus === 'HAVE' ? 'WANT' : 'HAVE' },
    })
  }

  const handleDelete = (id: string) => {
    deleteGrocery.mutate(id)
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
            {isEditing && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {isEditing ? (
                  <TextField
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    type="number"
                    size="small"
                  />
                ) : (
                  item.quantity
                )}
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={item.status === 'HAVE'}
                  onChange={() => handleStatusToggle(item.id, item.status ?? 'WANT')}
                />
              </TableCell>
              {isEditing && (
                <TableCell>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GroceryList
