interface GroceryItem {
  id: string
  name: string
  quantity?: number
  priority?: number
  status?: 'HAVE' | 'WANT'
  createdAt?: string
  updatedAt?: string
}

interface GroceryFormItem {
  name: string
  quantity?: number
}

export interface UpdateGroceryDto {
  name?: string
  quantity?: number
  status?: 'HAVE' | 'WANT'
}

export interface GroceryHistoryItem {
  id: string
  groceryId: string
  oldStatus?: 'HAVE' | 'WANT' | 'RANOUT'
  newStatus: 'HAVE' | 'WANT' | 'RANOUT'
  changedAt: string
}
