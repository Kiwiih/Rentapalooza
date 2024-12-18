import axios from 'axios'
import { ref } from 'vue'

export const useReviews = () => {
  const reviews = ref([])

  const fetchReviews = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_REVIEWS_URL, {
        headers: {
          'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
          'Content-Type': 'application/json'
        }
      })
      reviews.value = await response.data.record.reviews
      // console.log(reviews.value)
    } catch (err) {
      console.error(err)
    }
  }
  const addReview = async (newReview) => {
    try {
      await axios.put(
        import.meta.env.VITE_API_REVIEWS_URL,
        { reviews: newReview },
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
      reviews.value = newReview
    } catch (err) {
      console.error(err)
    }
  }

  return {
    reviews,
    fetchReviews,
    addReview
  }
}
