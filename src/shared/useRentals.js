import { ref } from 'vue';
import axios from 'axios';

const rentals = ref([]);
const error = ref(null);
const loading = false;

export const useRentals = () => {
  const fetchRentals = async () => {
    error.value = null;
    loading.value = true;

    try {
      const response = await axios.get(
        'https://api.jsonbin.io/v3/b/6751aeb5acd3cb34a8b49235',
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      rentals.value = response.data.record.rentals || [];
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching rentals.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addRental = async (newRental) => {
    error.value = null;
    loading.value = true;

    try {
      // Fetch existing rentals if not already loaded
      if (rentals.value.length === 0) {
        await fetchRentals();
      }

      const updatedRentals = [...rentals.value, newRental];

      // Update the rental bin
      const response = await axios.put(
        'https://api.jsonbin.io/v3/b/6751aeb5acd3cb34a8b49235',
        { rentals: updatedRentals },
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      rentals.value = response.data.record.rentals;
    } catch (err) {
      error.value = err.message || 'An error occurred while adding the rental.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    rentals,
    error,
    loading,
    fetchRentals,
    addRental,
  };
};
