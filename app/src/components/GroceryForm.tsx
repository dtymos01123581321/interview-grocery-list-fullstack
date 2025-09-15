import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { useCreateGrocery } from 'hooks/useGrocery'
import { GroceryFormItem } from '../types/data';

const GroceryForm: FC<{ openForm: boolean; setOpenForm: (openForm: boolean) => void }> = ({
  openForm,
  setOpenForm,
}) => {
  const { handleSubmit, control, reset } = useForm<GroceryFormItem>()
  const { mutateAsync: createGroceryItem } = useCreateGrocery()

  const handleFormClose = () => {
    setOpenForm(false)
    reset()
  }

  const onSubmit = async (data: GroceryFormItem) => {
    await createGroceryItem(data)
    setOpenForm(false)
    reset()
  }

  return (
    <Dialog open={openForm} onClose={handleFormClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} autoFocus margin="dense" label="Name" fullWidth />}
          />
          <Controller
            name="quantity"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Quantity" type="number" fullWidth />
            )}
          />
          <DialogActions>
            <Button onMouseDown={handleFormClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GroceryForm
