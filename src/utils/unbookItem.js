import { useRentals } from '@/shared/useRentals'

const handleUnbookItem = async (rental) => {
  const { updateRental } = useRentals()

  console.log('unbooking item', rental)

  const today = new Date()

  const formattedDate = today.toISOString().split('T')[0]

  const updatedField = {
    endDate: formattedDate
  }

  await updateRental(rental.id, updatedField)
}

export default handleUnbookItem
