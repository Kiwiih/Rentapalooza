// unbookItem.js

import { useItems } from '@/shared/useItems'
import { useRentals } from '@/shared/useRentals'

const { items, updateItems } = useItems()
const { updateRental, loading } = useRentals()

const handleUnbookItem = async (rental) => {
  // Logs object that's going to be unbooked
  console.log('unbooking item', rental)

  // Saves and format todays date
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0]

  // create a field with todays date
  const updatedField = {
    endDate: formattedDate
  }

  // set Availability to true on the specific item
  const updatedItems = items.value.map((item) => {
    if (item.id == rental.itemId) {
      return { ...item, isAvailable: true }
    }
    return item
  })

  try {
    loading.value = true

    // Update items with new values
    await updateItems(updatedItems)
    // Update rental with todays date
    await updateRental(rental.id, updatedField)
    console.log('Item unbooked successfully')
    // set local state of items
    items.value = updatedItems
  } catch (error) {
    console.error('Error unbooking item:', error)
  } finally {
    loading.value = false
  }
}

export default handleUnbookItem
