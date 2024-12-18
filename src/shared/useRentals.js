import { ref } from 'vue'
import axios from 'axios'

const rentals = ref([])
const error = ref(null)
const loading = ref(false)

export const useRentals = () => {
  // * Fetch all Rentals
  const fetchRentals = async () => {
    error.value = null
    loading.value = true
    try {
      const response = await axios.get(import.meta.env.VITE_API_RENTALS_URL, {
        headers: {
          'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
          'Content-Type': 'application/json'
        }
      })
      rentals.value = response.data.record.rentals || []
      console.log('Fetched Rentals successfully')
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching rentals.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // * Add new Rental
  const addRental = async (newRental) => {
    error.value = null
    loading.value = true
    try {
      if (rentals.value.length === 0) {
        await fetchRentals()
      }
      const updatedRentals = [...rentals.value, newRental]

      const response = await axios.put(
        import.meta.env.VITE_API_RENTALS_URL,
        { rentals: updatedRentals },
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json'
          }
        }
      )

      rentals.value = response.data.record.rentals
      console.log('Added Rental successfully')
    } catch (err) {
      error.value = err.message || 'An error occurred while adding the rental.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // * Update Rental
  const updateRental = async (rentalId, updatedFields) => {
    loading.value = true
    error.value = null

    try {
      // Start with fetching all rentals
      // await fetchRentals()

      // Find rental that should be updated
      const rentalIndex = rentals.value.findIndex(
        (rental) => rental.id === rentalId
      )

      // if rental can't be found
      if (rentalIndex === -1) {
        throw new Error('Rental could not be found')
      }

      // Update rental fields
      const updatedUser = { ...rentals.value[rentalIndex], ...updatedFields }

      // Update list with the updated rental
      rentals.value[rentalIndex] = updatedUser

      // Send updated data to the Api
      const response = await axios.put(
        import.meta.env.VITE_API_RENTALS_URL,
        { rentals: rentals.value },
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json'
          }
        }
      )

      rentals.value = await response.data.record.rentals
      console.log('Updated Rental successfully')
    } catch (err) {
      error.value = err.message || 'A problem occured while updating rentals'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    rentals,
    error,
    loading,

    fetchRentals,
    addRental,
    updateRental
  }
}
