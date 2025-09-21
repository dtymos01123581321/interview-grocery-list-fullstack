import { FC, useState } from 'react'
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
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'

import { useDeleteGrocery, useGroceryList, useUpdateGrocery } from 'hooks/useGrocery'

const GroceryList: FC<{ isEditing?: boolean }> = ({ isEditing }) => {
  const [status, setStatus] = useState<'HAVE' | 'WANT' | 'RANOUT' | undefined>(undefined)
  const [priority, setPriority] = useState<number | undefined>(undefined)
  const [perPage, setPerPage] = useState<number | undefined>(10)

  const [sortBy, setSortBy] = useState<'priority' | 'name' | 'quantity' | undefined>('priority')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const { data, isLoading, isError, error } = useGroceryList({ status, priority, perPage, sortBy, order })
  const updateGrocery = useUpdateGrocery()
  const deleteGrocery = useDeleteGrocery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const handleQuantityChange = (id: string, newValue: number) => {
    updateGrocery.mutate({ id, data: { quantity: newValue } })
  }

  const handleStatusToggle = (id: string, currentStatus?: 'HAVE' | 'WANT') => {
    updateGrocery.mutate({ id, data: { status: currentStatus === 'HAVE' ? 'WANT' : 'HAVE' } })
  }

  const handleDelete = (id: string) => {
    deleteGrocery.mutate(id)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Status */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status || ''}
            label="Status"
            onChange={(e) => setStatus((e.target.value || undefined) as 'HAVE' | 'WANT' | 'RANOUT' | undefined)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="HAVE">Have</MenuItem>
            <MenuItem value="RANOUT">Ran Out</MenuItem>
            <MenuItem value="WANT">Want</MenuItem>
          </Select>
        </FormControl>

        {/* Priority */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority || ''}
            label="Priority"
            onChange={(e) => setPriority(Number(e.target.value) || undefined)}
          >
            <MenuItem value="">All</MenuItem>
            {[1,2,3,4,5].map(p => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Per Page */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per Page</InputLabel>
          <Select
            value={perPage || ''}
            label="Per Page"
            onChange={(e) => setPerPage(Number(e.target.value) || undefined)}
          >
            {[5,10,20].map(p => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['name', 'quantity', 'status'].map((col) => (
                <TableCell
                  key={col}
                  onClick={() => {
                    if (sortBy === col) {
                      setOrder(order === 'asc' ? 'desc' : 'asc')
                    } else {
                      setSortBy(col as 'priority' | 'name' | 'quantity')
                      setOrder('asc')
                    }
                  }}
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  {sortBy === col && (
                    order === 'asc' ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )
                  )}
                </TableCell>
              ))}
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
    </Box>
  )
}

export default GroceryList
