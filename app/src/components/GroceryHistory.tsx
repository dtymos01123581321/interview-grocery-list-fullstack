import { FC } from 'react'
import { useGroceryHistory } from 'hooks/useGrocery'
import { GroceryHistoryItem } from '../types/data'
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material'

const GroceryHistory: FC<{ id: string; open: boolean; onClose: () => void }> = ({ id, open, onClose }) => {
  const { data, isLoading } = useGroceryHistory(id, open)

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>History</DialogTitle>
      <DialogContent>
        {isLoading && <div>Loading...</div>}
        <List>
          {data?.map((h: GroceryHistoryItem) => (
            <ListItem key={h.id}>
              <ListItemText
                primary={`Status changed from ${h.oldStatus ?? 'N/A'} to ${h.newStatus}`}
                secondary={new Date(h.changedAt).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default GroceryHistory
