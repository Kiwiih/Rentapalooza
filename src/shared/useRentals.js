import { ref } from 'vue'
import axios from 'axios'

const rentals = ref([])
const error = ref(null)
const loading = ref(false)

export const useRentals = () => {
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
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching rentals.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

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
    } catch (err) {
      error.value = err.message || 'An error occurred while adding the rental.'
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
    addRental
  }
}
